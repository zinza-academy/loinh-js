import { PaginationQueryDto } from '@dto/pagination-query.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcryptjs';
import { env } from 'config/envConfig';
import { CreateUserDto } from 'lib/shared/dtos/user/create-user.dto';
import { UpdateUserDto } from 'lib/shared/dtos/user/update-user.dto';
import { PrismaService } from 'lib/shared/modules/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly saltRounds = env.auth.SALT_ROUNDS;

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        identityNumber: createUserDto.identityNumber,
      },
    });
    return user;
  }

  async findAll(paginationQueryDto: PaginationQueryDto) {
    const { page = 1, limit = 10 } = paginationQueryDto;
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    const total = await this.prisma.user.count();
    return {
      data: users,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findOne(id: number, user) {
    const identity = await this.prisma.identity.findUnique({
      where: { userId: user.sub },
      select: { role: true },
    });

    let result;
    if (identity?.role === 'ADMIN') {
      result = await this.prisma.user.findUnique({
        where: { id },
        include: {
          ward: {
            include: {
              district: {
                include: {
                  province: true,
                },
              },
            },
          },
        },
      });
    } else {
      if (user.sub !== id) {
        throw new ForbiddenException('You are not allowed to get this user');
      }
      result = await this.prisma.user.findUnique({
        where: { id: user.sub },
        include: {
          ward: {
            include: {
              district: {
                include: {
                  province: true,
                },
              },
            },
          },
        },
      });
    }
    const { ward, ...rest } = result;

    const formattedResult = {
      ...rest,
      location: {
        ward: { name: ward?.name || '', id: ward?.id || null },
        district: {
          name: ward?.district?.name || '',
          id: ward?.district?.id || null,
        },
        province: {
          name: ward?.district?.province?.name || '',
          id: ward?.district?.province?.id || null,
        },
      },
    };
    if (!result) {
      throw new NotFoundException('User not found');
    }

    return formattedResult;
  }

  findUserByEmail(email: string) {
    return this.prisma.identity.findUnique({
      where: { email },
      select: {
        email: true,
        user: true,
      },
    });
  }

  async getHashedPassword(plaintextPassword: string) {
    const salt = genSaltSync(this.saltRounds);
    const hashedPassword = hashSync(plaintextPassword, salt);
    return hashedPassword;
  }

  async update(id: number, user, updateUserDto: UpdateUserDto) {
    const identity = await this.prisma.identity.findUnique({
      where: { userId: user.sub },
      select: { role: true },
    });

    const isUserExisted = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!isUserExisted) {
      throw new NotFoundException('User not found');
    }

    if (identity?.role === 'ADMIN') {
      if (updateUserDto.password) {
        const hashedPassword = await this.getHashedPassword(
          updateUserDto.password,
        );
        await this.prisma.identity.update({
          where: { userId: id },
          data: {
            password: hashedPassword,
            role: updateUserDto.role,
          },
        });
      }
      return this.prisma.user.update({
        where: { id },
        data: {
          ...updateUserDto,
          wardId:
            updateUserDto.wardId !== undefined && updateUserDto.wardId !== null
              ? typeof updateUserDto.wardId === 'string'
                ? isNaN(Number(updateUserDto.wardId))
                  ? null
                  : Number(updateUserDto.wardId)
                : updateUserDto.wardId
              : undefined,
        },
      });
    } else {
      const { password, ...updateUserDtoWithoutPassword } = updateUserDto;
      return this.prisma.user.update({
        where: { id: user.sub },
        data: {
          ...updateUserDtoWithoutPassword,
          wardId:
            updateUserDto.wardId !== undefined && updateUserDto.wardId !== null
              ? typeof updateUserDto.wardId === 'string'
                ? isNaN(Number(updateUserDto.wardId))
                  ? null
                  : Number(updateUserDto.wardId)
                : updateUserDto.wardId
              : undefined,
        },
      });
    }
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
