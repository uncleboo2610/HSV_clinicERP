import { Test, TestingModule } from '@nestjs/testing';
import { MedicalStorageController } from './medical-storage.controller';

describe('MedicalStorageController', () => {
  let controller: MedicalStorageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalStorageController],
    }).compile();

    controller = module.get<MedicalStorageController>(MedicalStorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
