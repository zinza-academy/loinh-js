import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationRegistrationController } from './vaccination-registration.controller';
import { VaccinationRegistrationService } from './vaccination-registration.service';

describe('VaccinationRegistrationController', () => {
  let controller: VaccinationRegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinationRegistrationController],
      providers: [VaccinationRegistrationService],
    }).compile();

    controller = module.get<VaccinationRegistrationController>(VaccinationRegistrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
