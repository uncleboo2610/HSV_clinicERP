import { Test, TestingModule } from '@nestjs/testing';
import { MedicineStorageController } from './medicine-storage.controller';

describe('MedicineStorageController', () => {
  let controller: MedicineStorageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineStorageController],
    }).compile();

    controller = module.get<MedicineStorageController>(MedicineStorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
