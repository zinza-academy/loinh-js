import { 
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsUrl,
  IsInt,
  Min,
  IsDateString,
  IsPhoneNumber
} from 'class-validator';
import { UserGender } from '@enum/user.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  identityNumber: string;

  @IsEnum(UserGender)
  gender: UserGender;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @IsInt()
  @Min(1)
  wardId: number;

  @IsDateString()
  @IsOptional()
  birthDate: string;

  @IsOptional()
  @IsPhoneNumber() 
  phone?: string;
}