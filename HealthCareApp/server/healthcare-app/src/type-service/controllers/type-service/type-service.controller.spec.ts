import { Test, TestingModule } from '@nestjs/testing';
import { TypeServiceController } from './type-service.controller';

describe('TypeServiceController', () => {
  let controller: TypeServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeServiceController],
    }).compile();

    controller = module.get<TypeServiceController>(TypeServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
