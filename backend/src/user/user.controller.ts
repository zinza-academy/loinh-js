import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'lib/shared/dtos/user/create-user.dto';
import { UpdateUserDto } from 'lib/shared/dtos/user/update-user.dto';
import { PaginationQueryDto } from '@dto/pagination-query.dto';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from 'lib/shared/decorators/roles.decorator';
import { UserRole } from '@enum/user.enum';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { JwtDecodedPayload } from 'lib/shared/decorators/jwt-layload.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '@/upload/upload.service';
import { UserPayloadJwt } from 'lib/shared/types/jwt-payload.type';
import { TrackMetrics } from '../decorators/track-metrics.decorator';
import { TrackApiMetrics } from '../decorators/track-api-metrics.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @TrackMetrics({ operation: 'create_user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @TrackMetrics({ operation: 'list_users', searchType: 'pagination', trackDuration: true })
  @TrackApiMetrics({ 
    endpoint: 'users_list', 
    trackResponseTime: true, 
    trackCalls: true,
    trackByUserRole: true 
  })
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.userService.findAll(paginationQueryDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @TrackMetrics({ operation: 'get_user', searchType: 'by_id', trackDuration: true })
  @TrackApiMetrics({ 
    endpoint: 'users_get_by_id', 
    trackResponseTime: true, 
    trackCalls: true,
    trackByUserRole: true 
  })
  findOne(@Param('id', ParseIntPipe) id: number, @JwtDecodedPayload() user) {
    return this.userService.findOne(+id, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @TrackMetrics({ operation: 'update_user' })
  @TrackApiMetrics({ 
    endpoint: 'users_update', 
    trackResponseTime: true, 
    trackCalls: true,
    trackByUserRole: true 
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @JwtDecodedPayload() user,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, user, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(+id);
  }

  @Post('upload-avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @JwtDecodedPayload() user: UserPayloadJwt,
  ) {
    if (!avatar) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const fileUrl = await this.userService.uploadAvatar(avatar, user);
      return {
        success: true,
        message: 'Avatar uploaded successfully',
        url: fileUrl.url,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to upload avatar');
    }
  }
}
