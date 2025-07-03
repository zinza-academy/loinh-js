import { PreferredSession } from '@enum/vaccine.enum';
import {
  IsNotEmpty,
  IsEnum,
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsDateString,
} from 'class-validator';

export class CreateVaccinationRegistrationDto {
  @IsString()
  @IsNotEmpty()
  priorityGroup: string;

  @IsString()
  @IsOptional()
  healthInsuranceNumber?: string;

  @IsOptional()
  @IsString()
  currentJob?: string;

  @IsOptional()
  currentAddressId?: number;

  @IsOptional()
  @IsEnum(PreferredSession)
  preferredSession?: PreferredSession;

  @IsOptional()
  @IsDateString()
  registrationDate?: Date;

  @IsInt()
  @IsOptional()
  vaccinationSiteId?: number;
}
