import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsUrl,
  IsInt,
  Min,
  IsDateString,
  IsPhoneNumber,
  IsEmail,
} from 'class-validator';
import { UserGender, UserRole } from '@enum/user.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  identityNumber: string;

  @IsEnum(UserGender)
  gender: UserGender;

  @IsInt()
  @Min(1)
  wardId: number;

  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
