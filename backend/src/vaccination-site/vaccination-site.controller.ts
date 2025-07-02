import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { VaccinationSiteService } from './vaccination-site.service';
import { CreateVaccinationSiteDto } from '../../lib/shared/dtos/vaccination-site/create-vaccination-site.dto';
import { UpdateVaccinationSiteDto } from '../../lib/shared/dtos/vaccination-site/update-vaccination-site.dto';
import { Roles } from 'lib/shared/decorators/roles.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { UserRole } from '@enum/user.enum';
import { PaginationQueryDto } from '@dto/pagination-query.dto';

@Controller('vaccination-sites')
export class VaccinationSiteController {
  constructor(
    private readonly vaccinationSiteService: VaccinationSiteService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() CreateVaccinationSiteDto: CreateVaccinationSiteDto) {
    return this.vaccinationSiteService.create(CreateVaccinationSiteDto);
  }

  @Get()
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.vaccinationSiteService.findAll(paginationQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccinationSiteService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() UpdateVaccinationSiteDto: UpdateVaccinationSiteDto,
  ) {
    return this.vaccinationSiteService.update(+id, UpdateVaccinationSiteDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.vaccinationSiteService.remove(+id);
  }
}
