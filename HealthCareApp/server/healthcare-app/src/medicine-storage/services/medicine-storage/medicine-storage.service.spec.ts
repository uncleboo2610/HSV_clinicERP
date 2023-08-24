import { Test, TestingModule } from '@nestjs/testing';
import { MedicineStorageService } from './medicine-storage.service';

describe('MedicineStorageService', () => {
  let service: MedicineStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicineStorageService],
    }).compile();

    service = module.get<MedicineStorageService>(MedicineStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
