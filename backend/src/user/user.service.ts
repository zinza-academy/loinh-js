import { Injectable } from '@nestjs/common';
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
        identityNumber: Number(createUserDto.identityNumber),
      },
    });
    return user;
}

  async findAll(
    page: number,
    limit: number,
  ) {
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
        total
      },
    };
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({  
      where: { id },
    });
  }

  findUserByEmail(email: string) {
    return  this.prisma.identity.findUnique({
      where: { email },
      select: {
        email: true,
        user: true,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
     data: {
        ...updateUserDto,
        identityNumber: Number(updateUserDto.identityNumber),
      },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
