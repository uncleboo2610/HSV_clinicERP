import { Test, TestingModule } from '@nestjs/testing';
import { PharmaceuticalWarehouseService } from './pharmaceutical-warehouse.service';

describe('PharmaceuticalWarehouseService', () => {
  let service: PharmaceuticalWarehouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PharmaceuticalWarehouseService],
    }).compile();

    service = module.get<PharmaceuticalWarehouseService>(PharmaceuticalWarehouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
