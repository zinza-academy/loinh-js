import { Module } from '@nestjs/common';
import { VaccinationSiteService } from './vaccination-site.service';
import { VaccinationSiteController } from './vaccination-site.controller';
import { PrismaModule } from 'lib/shared/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VaccinationSiteController],
  providers: [VaccinationSiteService],
})
export class VaccinationSiteModule {}
