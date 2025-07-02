import { Injectable } from '@nestjs/common';
import { CreateVaccinationSiteDto } from '../../lib/shared/dtos/vaccination-site/create-vaccination-site.dto';
import { UpdateVaccinationSiteDto } from '../../lib/shared/dtos/vaccination-site/update-vaccination-site.dto';
import { PrismaService } from 'lib/shared/modules/prisma/prisma.service';
import { PaginationQueryDto } from '@dto/pagination-query.dto';

@Injectable()
export class VaccinationSiteService {
  constructor(private prisma: PrismaService) {}
  create(CreateVaccinationSiteDto: CreateVaccinationSiteDto) {
    return this.prisma.vaccinationSite.create({
      data: CreateVaccinationSiteDto,
    });
  }

  async findAll(paginationQueryDto: PaginationQueryDto) {
    const { page = 1, limit = 10 } = paginationQueryDto;
    const vaccinationSites = await this.prisma.vaccinationSite.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    const total = await this.prisma.vaccinationSite.count();
    return {
      data: vaccinationSites,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  findOne(id: number) {
    return this.prisma.vaccinationSite.findUnique({
      where: { id },
    });
  }

  update(id: number, UpdateVaccinationSiteDto: UpdateVaccinationSiteDto) {
    return this.prisma.vaccinationSite.update({
      where: { id },
      data: UpdateVaccinationSiteDto,
    });
  }

  remove(id: number) {
    return this.prisma.vaccinationSite.delete({
      where: { id },
    });
  }
}
