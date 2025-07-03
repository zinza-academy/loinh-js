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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.userService.findAll(paginationQueryDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number, @JwtDecodedPayload() user) {
    return this.userService.findOne(+id, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
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
}
