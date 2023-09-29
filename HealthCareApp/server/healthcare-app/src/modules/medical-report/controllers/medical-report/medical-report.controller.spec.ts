import { Test, TestingModule } from '@nestjs/testing';
import { MedicalReportController } from './medical-report.controller';

describe('MedicalReportController', () => {
  let controller: MedicalReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalReportController],
    }).compile();

    controller = module.get<MedicalReportController>(MedicalReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
