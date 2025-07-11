import { UserService } from '@/user/user.service';
import { LoginUserDto, RegisterUserDto } from '@dto/auth/auth.dto';
import { UserRole } from '@enum/user.enum';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from 'config/envConfig';
import { Request, Response } from 'express';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { PrismaService } from 'lib/shared/modules/prisma/prisma.service';
import {
  JwtPayload,
  UserPayloadDecodedJwt,
  UserPayloadJwt,
  VerifyResetPasswordCodeDto,
} from 'lib/shared/types/jwt-payload.type';
import * as ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly saltRounds = env.auth.SALT_ROUNDS;
  async getUserByEmail(email: string) {
    return this.prisma.identity.findUnique({
      where: { email },
      select: { email: true, password: true, user: true },
    });
  }

  async validateUser(email: string, pass: string): Promise<UserPayloadJwt> {
    const user = await this.getUserByEmail(email);
    if (user && (await this.validatePassword(pass, user.password))) {
      const { user: userInfo, password, email, ...result } = user;
      return { userId: userInfo.id };
    }
    throw new UnauthorizedException('Invalid email or password');
  }

  async login(user: UserPayloadJwt, res: Response) {
    const access_token = await this.generateToken(user, false);
    const refresh_token = await this.generateToken(user, true);
    const identity = await this.prisma.identity.findUnique({
      where: { userId: user.userId },
      select: { role: true },
    });
    const userData = await this.prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        avatarUrl: true,
        name: true,
        birthDate: true,
        isActive: true,
        gender: true,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return {
      user: { ...userData, role: identity?.role },
      access_token,
      refresh_token,
    };
  }
  async changePassword(user: UserPayloadDecodedJwt, newPassword: string) {
    const hashedPassword = await this.getHashedPassword(newPassword);
    await this.prisma.identity.update({
      where: { userId: user.sub },
      data: { password: hashedPassword },
    });
    return { message: 'Password changed successfully' };
  }

  async refresh(token: string, res: Response) {
    const decoded: any = await this.verifyToken(token, true);
    const { exp, iat, ...payload } = decoded;
    const access_token = await this.generateToken(payload, false);
    const refresh_token = await this.generateToken(payload, true);
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return {
      access_token,
      refresh_token,
    };
  }

  async validateToken(
    headers: Record<string, string>,
    ignoreExpiration?: boolean,
  ) {
    const [bearer, token] =
      (headers['authorization'] || headers['Authorization'])?.split(' ') ?? [];
    if (!bearer || bearer.toLowerCase() !== 'bearer') {
      throw new UnauthorizedException();
    }

    return this.verifyToken(token, ignoreExpiration);
  }

  async verifyToken(
    token: string,
    isRefresh: boolean = false,
  ): Promise<JwtPayload> {
    if (!token) {
      throw new UnauthorizedException('Token is required');
    }
    const isInvalidToken = await this.prisma.invalidToken.findUnique({
      where: {
        token: token,
      },
    });
    if (isInvalidToken) throw new UnauthorizedException();
    return this.jwtService.verify(token, {
      secret: isRefresh
        ? env.jwt.JWT_REFRESH_TOKEN_SECRET
        : env.jwt.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async register(registerUserDto: RegisterUserDto) {
    const IsEmailExists = await this.prisma.identity.findFirst({
      where: {
        email: registerUserDto.email,
      },
    });

    const identityNumberExists = await this.prisma.user.findUnique({
      where: {
        identityNumber: registerUserDto.identityNumber,
      },
    });

    if (IsEmailExists) {
      throw new BadRequestException('Email already exists');
    }
    if (identityNumberExists) {
      throw new BadRequestException('Identity number already exists');
    }

    // Tách email/password ra, phần còn lại dùng để tạo User
    const { email, password, ...userData } = registerUserDto;
    const newUser = await this.userService.create({
      ...userData,
    });

    // Hash và tạo Identity
    const hashedPassword = await this.getHashedPassword(password);
    await this.prisma.identity.create({
      data: {
        email,
        password: hashedPassword,
        userId: newUser.id,
      },
    });

    return {
      message: 'User registered successfully',
    };
  }

  async getHashedPassword(plaintextPassword: string) {
    const salt = genSaltSync(this.saltRounds);
    const hashedPassword = hashSync(plaintextPassword, salt);
    return hashedPassword;
  }

  async logout(req: Request, res: Response) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException();
    }
    const token = authHeader.split(' ')[1];
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    await this.prisma.invalidToken.create({
      data: {
        token,
        expiredAt: new Date(Date.now() + ms(env.jwt.JWT_ACCESS_TOKEN_EXPIRE)),
      },
    });
    const logoutMessage = 'Logout successful';
    return { message: logoutMessage };
  }

  async requestPasswordReset(email: string) {
    const user = await this.getUserByEmail(email);
    if (!user) throw new NotFoundException();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const resetCodeCount = await this.prisma.resetPasswordCode.count({
      where: {
        userId: user.user.id,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (resetCodeCount >= 5) {
      const tomorrow = new Date(startOfDay);
      tomorrow.setDate(tomorrow.getDate() + 1);
      throw new ForbiddenException();
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeExpire = env.auth.RESET_CODE_EXPIRE;
    const expiresInMs = ms(resetCodeExpire);
    const expiresAt = new Date(Date.now() + expiresInMs);

    await this.prisma.resetPasswordCode.create({
      data: {
        code: resetCode,
        expiredAt: expiresAt,
        userId: user.user.id,
      },
    });

    const resetToken = this.jwtService.sign(
      { userId: user.user.id },
      {
        secret: env.jwt.JWT_RESET_PASSWORD_SECRET,
        expiresIn: env.jwt.JWT_RESET_PASSWORD_EXPIRE,
      },
    );

    const resetUrl = `${env.frontendUrl}/account/reset-password?token=${resetToken}`;

    // const job = await this.sendMailQueue.add(
    //   QUEUE_NAMES[QUEUES.SEND_EMAIL].SendResetCode,
    //   {
    //     email,
    //     resetCode,
    //     resetUrl,
    //   },
    //   {
    //     attempts: 3,
    //     backoff: {
    //       type: 'exponential',
    //       delay: 5000,
    //     },
    //   },
    // );

    // const resetCodeMessage = 'Reset code sent to email' + email;
    // return await job.finished().then(() => {
    //   return { message: resetCodeMessage, email };
    // });
  }

  async verifyResetPasswordCode(
    verifyResetPasswordCodeDto: VerifyResetPasswordCodeDto,
  ) {
    const { code, email } = verifyResetPasswordCodeDto;
    const resetCode = await this.validateResetCode(code, email);

    const resetToken = this.jwtService.sign(
      { email: email, sub: 'reset password token' },
      {
        secret: env.jwt.JWT_RESET_PASSWORD_SECRET,
        expiresIn: env.jwt.JWT_RESET_PASSWORD_EXPIRE,
      },
    );
    const verifySuccessMessage = 'Verify reset code successfully';
    await this.prisma.resetPasswordCode.delete({
      where: { id: resetCode.id },
    });
    return { message: verifySuccessMessage, resetToken, email };
  }

  async resetPasswordWithToken(token: string, newPassword: string) {
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(token, {
        secret: env.jwt.JWT_RESET_PASSWORD_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    const user = await this.getUserByEmail(payload.email || payload.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await this.getHashedPassword(newPassword);

    const updatePasswordMessage = 'Password updated successfully';
    await this.prisma.identity.update({
      where: { userId: user.user.id },
      data: {
        password: hashedPassword,
      },
    });

    return { message: updatePasswordMessage };
  }

  private async validatePassword(
    plaintextPassword: string,
    hashedPassword: string,
  ) {
    return await compareSync(plaintextPassword, hashedPassword);
  }

  private async validateResetCode(code: string, email: string) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const resetCode = await this.prisma.resetPasswordCode.findFirst({
      where: { code: String(code), userId: user.user.id },
    });

    if (!resetCode || resetCode.expiredAt < new Date()) {
      throw new BadRequestException();
    }

    return resetCode;
  }
  private generateToken(payload: UserPayloadJwt, isRefresh: boolean) {
    return this.jwtService.sign(
      {
        sub: payload.userId,
        type: isRefresh ? 'refresh' : 'access',
      },
      {
        secret: isRefresh
          ? env.jwt.JWT_REFRESH_TOKEN_SECRET
          : env.jwt.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: isRefresh
          ? env.jwt.JWT_REFRESH_TOKEN_EXPIRE
          : env.jwt.JWT_ACCESS_TOKEN_EXPIRE,
      },
    );
  }
}
