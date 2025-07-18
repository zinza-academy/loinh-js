import { PaginationQueryDto } from '@dto/pagination-query.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcryptjs';
import { env } from 'config/envConfig';
import { CreateUserDto } from 'lib/shared/dtos/user/create-user.dto';
import { UpdateUserDto } from 'lib/shared/dtos/user/update-user.dto';
import { PrismaService } from 'lib/shared/modules/prisma/prisma.service';
import { UserRole } from '@enum/user.enum';
import { UploadService } from '@/upload/upload.service';
import { S3Service } from 'lib/shared/modules/s3/s3.service';
import { v4 as uuid } from 'uuid';
import { BUCKET_NAME } from 'lib/shared/constants/bucket-name';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private s3Service: S3Service,
  ) {}
  private readonly saltRounds = env.auth.SALT_ROUNDS;

  async create(createUserDto: CreateUserDto) {
    const { email, password, role = 'USER', ...userData } = createUserDto;

    // Validate required fields
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    // Check if user with this email already exists
    const existingUser = await this.prisma.identity.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await this.getHashedPassword(password);

    // Create user and identity in a transaction
    const result = await this.prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          name: userData.name,
          identityNumber: userData.identityNumber,
          gender: userData.gender,
          wardId: userData.wardId,
          birthDate:
            userData.birthDate && userData.birthDate.trim() !== ''
              ? new Date(userData.birthDate)
              : null,
          phone:
            userData.phone && userData.phone.trim() !== ''
              ? userData.phone
              : null,
        },
      });

      // Create identity
      await tx.identity.create({
        data: {
          email,
          password: hashedPassword,
          role: role as UserRole,
          userId: user.id,
        },
      });

      return user;
    });

    return result;
  }

  async findAll(paginationQueryDto: PaginationQueryDto) {
    const { page = 1, limit = 10 } = paginationQueryDto;
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
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
        identities: {
          select: {
            email: true,
            role: true,
          },
        },
      },
    });

    const total = await this.prisma.user.count();

    // Transform data to include location information
    const transformedUsers = users.map((user) => {
      const { ward, identities, ...userWithoutRelations } = user;
      return {
        ...userWithoutRelations,
        location: ward
          ? {
              ward: {
                id: ward.id,
                name: ward.name,
              },
              district: {
                id: ward.district.id,
                name: ward.district.name,
              },
              province: {
                id: ward.district.province.id,
                name: ward.district.province.name,
              },
            }
          : null,
        identity: identities
          ? {
              email: identities.email,
              role: identities.role,
            }
          : null,
      };
    });

    return {
      data: transformedUsers,
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
          avatar: true,
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
      if (!result) {
        throw new NotFoundException('User not found');
      }
    } else {
      if (user.sub !== id) {
        throw new ForbiddenException('You are not allowed to get this user');
      }
      result = await this.prisma.user.findUnique({
        where: { id: user.sub },
        include: {
          avatar: true,
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
      avatar: result.avatar ? result.avatar.key : null,
      role: identity?.role,
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

    // Prepare user data with proper type handling
    const { password, role, ...userUpdateData } = updateUserDto;
    const processedUserData = {
      ...userUpdateData,
      wardId:
        updateUserDto.wardId !== undefined && updateUserDto.wardId !== null
          ? typeof updateUserDto.wardId === 'string'
            ? isNaN(Number(updateUserDto.wardId))
              ? null
              : Number(updateUserDto.wardId)
            : updateUserDto.wardId
          : undefined,
      birthDate: updateUserDto.birthDate
        ? typeof updateUserDto.birthDate === 'string' &&
          updateUserDto.birthDate.trim() !== ''
          ? new Date(updateUserDto.birthDate)
          : null
        : undefined,
      phone:
        updateUserDto.phone && updateUserDto.phone.trim() !== ''
          ? updateUserDto.phone
          : null,
    };

    if (identity?.role === 'ADMIN') {
      if (password || role) {
        const identityUpdateData: any = {};
        if (password) {
          identityUpdateData.password = await this.getHashedPassword(password);
        }
        if (role) {
          identityUpdateData.role = role;
        }
        await this.prisma.identity.update({
          where: { userId: id },
          data: identityUpdateData,
        });
      }

      return this.prisma.user.update({
        where: { id },
        data: processedUserData,
      });
    } else {
      if (user.sub !== id) {
        throw new ForbiddenException('You can only update your own profile');
      }

      return this.prisma.user.update({
        where: { id: user.sub },
        data: processedUserData,
      });
    }
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async uploadAvatar(file: Express.Multer.File, user) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    if (!user || !user.sub) {
      throw new ForbiddenException('You must be logged in to upload an avatar');
    }

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { id: user.sub },
      include: { avatar: true },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const key = uuid();
    const bucket = BUCKET_NAME.USER_AVATARS;

    try {
      // Upload file to MinIO
      await this.s3Service.uploadFile(bucket, key, file.buffer, file.mimetype);

      // Delete old avatar from MinIO if exists
      if (existingUser.avatar?.key) {
        await this.s3Service.deleteFile(bucket, existingUser.avatar.key);
      }

      // Update or create file metadata in database
      const fileData = {
        key,
        mineType: file.mimetype,
        name: key,
        originalname: file.originalname,
        size: file.size,
        userId: user.sub,
      };

      let fileRecord;
      if (existingUser.avatar) {
        // Update existing file record
        fileRecord = await this.prisma.file.update({
          where: { userId: user.sub },
          data: fileData,
        });
      } else {
        // Create new file record
        fileRecord = await this.prisma.file.create({
          data: fileData,
        });
      }

      // Create API URL that matches the FileController route
      const apiUrl = `/files/avatars/${key}`;

      // Update user's avatar reference
      await this.prisma.user.update({
        where: { id: user.sub },
        data: {
          avatar: {
            connect: { key },
          },
        },
      });

      return { url: apiUrl };
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw new BadRequestException('Failed to upload avatar');
    }
  }
}
