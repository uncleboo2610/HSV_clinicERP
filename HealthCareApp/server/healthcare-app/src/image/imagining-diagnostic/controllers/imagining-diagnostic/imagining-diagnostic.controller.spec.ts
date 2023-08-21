import { Test, TestingModule } from '@nestjs/testing';
import { ImaginingDiagnosticController } from './imagining-diagnostic.controller';

describe('ImaginingDiagnosticController', () => {
  let controller: ImaginingDiagnosticController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImaginingDiagnosticController],
    }).compile();

    controller = module.get<ImaginingDiagnosticController>(ImaginingDiagnosticController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
