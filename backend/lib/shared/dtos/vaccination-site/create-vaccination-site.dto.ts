import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVaccinationSiteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  headOfVaccination: string;

  @IsNotEmpty()
  wardId: number;
}
