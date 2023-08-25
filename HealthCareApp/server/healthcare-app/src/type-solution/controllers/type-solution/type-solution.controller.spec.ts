import { Test, TestingModule } from '@nestjs/testing';
import { TypeSolutionController } from './type-solution.controller';

describe('TypeSolutionController', () => {
  let controller: TypeSolutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeSolutionController],
    }).compile();

    controller = module.get<TypeSolutionController>(TypeSolutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
