import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationSiteController } from './vaccination-site.controller';
import { VaccinationSiteService } from './vaccination-site.service';

describe('VaccinationSiteController', () => {
  let controller: VaccinationSiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinationSiteController],
      providers: [VaccinationSiteService],
    }).compile();

    controller = module.get<VaccinationSiteController>(
      VaccinationSiteController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
