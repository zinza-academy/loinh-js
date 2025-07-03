import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { VaccinationRegistrationService } from './vaccination-registration.service';
import { CreateVaccinationRegistrationDto } from '../../lib/shared/dtos/vaccination-registration/create-vaccination-registration.dto';
import { UpdateVaccinationRegistrationDto } from '../../lib/shared/dtos/vaccination-registration/update-vaccination-registration.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { JwtDecodedPayload } from 'lib/shared/decorators/jwt-layload.decorator';
import { PaginationQueryDto } from '@dto/pagination-query.dto';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from 'lib/shared/decorators/roles.decorator';
import { UserRole } from '@enum/user.enum';

@Controller('vaccination-registrations')
export class VaccinationRegistrationController {
  constructor(
    private readonly vaccinationRegistrationService: VaccinationRegistrationService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createVaccinationRegistrationDto: CreateVaccinationRegistrationDto,
    @JwtDecodedPayload() user,
  ) {
    return this.vaccinationRegistrationService.create(
      createVaccinationRegistrationDto,
      user,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @JwtDecodedPayload() user,
    @Query() paginationQueryDto: PaginationQueryDto,
  ) {
    return this.vaccinationRegistrationService.findAll(
      paginationQueryDto,
      user,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vaccinationRegistrationService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVaccinationRegistrationDto: UpdateVaccinationRegistrationDto,
  ) {
    return this.vaccinationRegistrationService.update(
      id,
      updateVaccinationRegistrationDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vaccinationRegistrationService.remove(id);
  }
}
