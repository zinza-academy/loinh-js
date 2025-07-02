import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationRegistrationService } from './vaccination-registration.service';

describe('VaccinationRegistrationService', () => {
  let service: VaccinationRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccinationRegistrationService],
    }).compile();

    service = module.get<VaccinationRegistrationService>(VaccinationRegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
