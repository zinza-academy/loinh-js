import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationSiteService } from './vaccination-site.service';

describe('VaccinationSiteService', () => {
  let service: VaccinationSiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccinationSiteService],
    }).compile();

    service = module.get<VaccinationSiteService>(VaccinationSiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
