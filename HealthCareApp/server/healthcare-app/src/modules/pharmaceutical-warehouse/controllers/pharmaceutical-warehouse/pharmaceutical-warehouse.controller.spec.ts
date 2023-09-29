import { Test, TestingModule } from '@nestjs/testing';
import { PharmaceuticalWarehouseController } from './pharmaceutical-warehouse.controller';

describe('PharmaceuticalWarehouseController', () => {
  let controller: PharmaceuticalWarehouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharmaceuticalWarehouseController],
    }).compile();

    controller = module.get<PharmaceuticalWarehouseController>(PharmaceuticalWarehouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
