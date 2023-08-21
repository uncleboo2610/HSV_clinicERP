import { Test, TestingModule } from '@nestjs/testing';
import { ImaginingDiagnosticService } from './imagining-diagnostic.service';

describe('ImaginingDiagnosticService', () => {
  let service: ImaginingDiagnosticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImaginingDiagnosticService],
    }).compile();

    service = module.get<ImaginingDiagnosticService>(ImaginingDiagnosticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
