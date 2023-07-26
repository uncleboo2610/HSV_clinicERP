import { Test, TestingModule } from '@nestjs/testing';
import { ReceivingCardController } from './receiving-card.controller';

describe('ReceivingCardController', () => {
  let controller: ReceivingCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceivingCardController],
    }).compile();

    controller = module.get<ReceivingCardController>(ReceivingCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
