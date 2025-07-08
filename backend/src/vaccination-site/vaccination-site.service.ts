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
      select: {
        id: true,
        name: true,
        headOfVaccination: true,
        addressDetail: true,
        numberOfInjectionTable: true,
        ward: {
          select: {
            id: true,
            name: true,
            district: {
              select: {
                id: true,
                name: true,
                province: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const formattedData = vaccinationSites.map((site) => ({
      id: site.id,
      name: site.name,
      headOfVaccination: site.headOfVaccination,
      addressDetail: site.addressDetail,
      numberOfInjectionTable: site.numberOfInjectionTable,
      ward: {
        id: site.ward?.id,
        name: site.ward?.name,
      },
      district: {
        id: site.ward?.district?.id,
        name: site.ward?.district?.name,
      },
      province: {
        id: site.ward?.district?.province?.id,
        name: site.ward?.district?.province?.name,
      },
    }));
    const total = await this.prisma.vaccinationSite.count();
    return {
      data: formattedData,
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
