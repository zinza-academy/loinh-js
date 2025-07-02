import { Module } from '@nestjs/common';
import { VaccinationRegistrationService } from './vaccination-registration.service';
import { VaccinationRegistrationController } from './vaccination-registration.controller';
import { PrismaModule } from 'lib/shared/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VaccinationRegistrationController],
  providers: [VaccinationRegistrationService],
})
export class VaccinationRegistrationModule {}
