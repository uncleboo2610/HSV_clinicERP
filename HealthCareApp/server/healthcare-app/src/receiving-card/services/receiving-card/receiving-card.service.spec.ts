import { Test, TestingModule } from '@nestjs/testing';
import { ReceivingCardService } from './receiving-card.service';

describe('ReceivingCardService', () => {
  let service: ReceivingCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceivingCardService],
    }).compile();

    service = module.get<ReceivingCardService>(ReceivingCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
