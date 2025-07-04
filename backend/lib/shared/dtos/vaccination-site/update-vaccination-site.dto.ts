import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateVaccinationSiteDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  headOfVaccination?: string;

  @IsOptional()
  wardId?: number;

  @IsNotEmpty()
  @IsString()
  addressDetail: string;

  @IsNotEmpty()
  @IsString()
  numberOfInjectionTable: string;
}
