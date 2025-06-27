import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { PrismaModule } from 'lib/shared/modules/prisma/prisma.module';
import { ImportLocationDataCommand } from 'lib/data/location/import-location-data.command';

@Module({
  imports: [PrismaModule],
  controllers: [LocationController],
  providers: [LocationService, ImportLocationDataCommand],
})
export class LocationModule {}
