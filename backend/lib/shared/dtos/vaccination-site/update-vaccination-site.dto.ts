import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateVaccinationSiteDto {
  @IsString()
  name: string;

  @IsString()
  headOfVaccination: string;

  wardId: number;
}
