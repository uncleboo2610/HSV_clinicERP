import { Test, TestingModule } from '@nestjs/testing';
import { ParaclinicalController } from './paraclinical.controller';

describe('ParaclinicalController', () => {
  let controller: ParaclinicalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParaclinicalController],
    }).compile();

    controller = module.get<ParaclinicalController>(ParaclinicalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
