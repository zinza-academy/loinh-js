import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  PreferredSession,
  VaccineStatus,
  VaccineType,
} from '@enum/vaccine.enum';

export class UpdateVaccinationRegistrationDto {
  @IsString()
  @IsOptional()
  priorityGroup?: string;

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

  @IsEnum(VaccineType)
  @IsOptional()
  vaccineType?: VaccineType;

  @IsEnum(VaccineStatus)
  @IsOptional()
  status?: VaccineStatus;
}
