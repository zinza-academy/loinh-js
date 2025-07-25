import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangePassworDto,
  LoginUserDto,
  RegisterUserDto,
  ResetPasswordWithTokenDto,
} from '@dto/auth/auth.dto';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtDecodedPayload } from 'lib/shared/decorators/jwt-layload.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { VerifyResetPasswordCodeDto } from 'lib/shared/types/jwt-payload.type';
import { TrackMetrics } from '../decorators/track-metrics.decorator';
import { TrackApiMetrics } from '../decorators/track-api-metrics.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @TrackMetrics({ operation: 'login_user' })
  @TrackApiMetrics({ 
    endpoint: 'auth_login', 
    trackResponseTime: true, 
    trackCalls: true,
    trackByUserRole: false 
  })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @JwtDecodedPayload() user,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(user, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @TrackMetrics({ operation: 'logout_user' })
  @TrackApiMetrics({ 
    endpoint: 'auth_logout', 
    trackResponseTime: true, 
    trackCalls: true,
    trackByUserRole: true 
  })
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return this.authService.logout(req, res);
  }

  @Post('register')
  @TrackMetrics({ operation: 'register_user' })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(req.cookies['refresh_token'], res);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Body() changePasswordDto: ChangePassworDto,
    @JwtDecodedPayload() user,
  ) {
    return this.authService.changePassword(user, changePasswordDto.newPassword);
  }

  @Post('request-password-reset-code')
  async requestPasswordReset(@Body() body: { email: string }) {
    return this.authService.requestPasswordReset(body.email);
  }

  @Post('verify-reset-password-code')
  async resetPasswordWithCode(
    @Body() verifyResetPasswordCodeDto: VerifyResetPasswordCodeDto,
  ) {
    return this.authService.verifyResetPasswordCode(verifyResetPasswordCodeDto);
  }

  @Post('reset-password')
  async resetPasswordWithToken(
    @Body() resetPasswordDto: ResetPasswordWithTokenDto,
  ) {
    const { token, newPassword } = resetPasswordDto;
    return this.authService.resetPasswordWithToken(token, newPassword);
  }
}
