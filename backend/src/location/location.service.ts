import { Injectable } from '@nestjs/common';
import { PrismaService } from 'lib/shared/modules/prisma/prisma.service';

@Injectable()
export class LocationService {
  constructor(
    private prisma: PrismaService,
  ) {}
  findAll() {
    return this.prisma.province.findMany({
      include: {
        districts: {
          include: {
            wards: true,
          },
        },
      },
    });
  }
}
