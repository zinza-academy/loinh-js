import { UserRole } from '@enum/user.enum';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  identityNumber?: string;

  @IsString()
  @IsOptional()
  birthDate?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsNumber()
  @IsOptional()
  wardId?: number;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
