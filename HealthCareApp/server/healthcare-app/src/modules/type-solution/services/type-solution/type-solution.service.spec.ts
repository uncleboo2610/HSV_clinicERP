import { Test, TestingModule } from '@nestjs/testing';
import { TypeSolutionService } from './type-solution.service';

describe('TypeSolutionService', () => {
  let service: TypeSolutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeSolutionService],
    }).compile();

    service = module.get<TypeSolutionService>(TypeSolutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
