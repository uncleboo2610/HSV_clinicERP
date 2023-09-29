import { Test, TestingModule } from '@nestjs/testing';
import { ParaclinicalService } from './paraclinical.service';

describe('ParaclinicalService', () => {
  let service: ParaclinicalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParaclinicalService],
    }).compile();

    service = module.get<ParaclinicalService>(ParaclinicalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
