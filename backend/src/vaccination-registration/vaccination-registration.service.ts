import { Injectable } from '@nestjs/common';
import { CreateVaccinationRegistrationDto } from '../../lib/shared/dtos/vaccination-registration/create-vaccination-registration.dto';
import { UpdateVaccinationRegistrationDto } from '../../lib/shared/dtos/vaccination-registration/update-vaccination-registration.dto';
import { PrismaService } from 'lib/shared/modules/prisma/prisma.service';
import { PaginationQueryDto } from '@dto/pagination-query.dto';
import { PreferredSession } from '@enum/vaccine.enum';

@Injectable()
export class VaccinationRegistrationService {
  constructor(private prisma: PrismaService) {}
  create(
    createVaccinationRegistrationDto: CreateVaccinationRegistrationDto,
    user,
  ) {
    const { sub } = user;

    return this.prisma.vaccinationRegistration.create({
      data: {
        ...createVaccinationRegistrationDto,
        userId: Number(sub),
        preferredSession:
          (createVaccinationRegistrationDto.preferredSession as any) ??
          PreferredSession.MORNING,
      },
    });
  }

  async findAll(paginationQueryDto: PaginationQueryDto, user) {
    // Await the result to get the actual role
    const identity = await this.prisma.identity.findUnique({
      where: { userId: user.sub },
      select: { role: true },
    });

    const { limit = 10, page = 1 } = paginationQueryDto;
    let result;
    let total;
    // Check if the user is an admin or not
    if (identity?.role === 'ADMIN') {
      // If admin, return all vaccination registrations
      result = await this.prisma.vaccinationRegistration.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });
      total = await this.prisma.vaccinationRegistration.count();
    }

    // If not admin, return only the registrations of the user
    result = await this.prisma.vaccinationRegistration.findMany({
      where: { userId: user.sub },
      skip: (page - 1) * limit,
      take: limit,
    });
    total = await this.prisma.vaccinationRegistration.count({
      where: { userId: user.sub },
    });

    return {
      data: result,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  findOne(id: number) {
    return this.prisma.vaccinationRegistration.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateVaccinationRegistrationDto: UpdateVaccinationRegistrationDto,
  ) {
    return await this.prisma.vaccinationRegistration.update({
      where: { id },
      data: {
        ...updateVaccinationRegistrationDto,
        preferredSession:
          (updateVaccinationRegistrationDto.preferredSession as any) ??
          PreferredSession.MORNING,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.vaccinationRegistration.delete({
      where: { id },
    });
  }
}
