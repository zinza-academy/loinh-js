import { PaginationQueryDto } from '@dto/pagination-query.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'lib/shared/dtos/user/create-user.dto';
import { UpdateUserDto } from 'lib/shared/dtos/user/update-user.dto';
import { PrismaService } from 'lib/shared/modules/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
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
      });
    } else {
      if (user.sub !== id) {
        throw new ForbiddenException('You are not allowed to get this user');
      }
      result = await this.prisma.user.findUnique({
        where: { id: user.sub },
      });
    }

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return result;
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
      return this.prisma.user.update({
        where: { id },
        data: {
          ...updateUserDto,
        },
      });
    } else {
      if (user.sub !== id) {
        throw new ForbiddenException('You are not allowed to update this user');
      }
      return this.prisma.user.update({
        where: { id: user.sub },
        data: {
          ...updateUserDto,
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
