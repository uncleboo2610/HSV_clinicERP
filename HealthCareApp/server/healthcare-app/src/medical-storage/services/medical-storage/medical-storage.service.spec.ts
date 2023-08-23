import { Test, TestingModule } from '@nestjs/testing';
import { MedicalStorageService } from './medical-storage.service';

describe('MedicalStorageService', () => {
  let service: MedicalStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalStorageService],
    }).compile();

    service = module.get<MedicalStorageService>(MedicalStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
