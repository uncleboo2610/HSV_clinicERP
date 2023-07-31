import { Module } from '@nestjs/common';
import { ReceivingCardService } from './services/receiving-card/receiving-card.service';
import { ReceivingCardController } from './controllers/receiving-card/receiving-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceivingCard } from 'src/entities/receiving-card.entity';
import { Department } from 'src/entities/department.entity';
import { Patient } from 'src/entities/patient.entity';
import { ReceivingCardDetail } from 'src/entities/receiving-card-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReceivingCard, Department, Patient, ReceivingCardDetail])],
  providers: [ReceivingCardService],
  controllers: [ReceivingCardController]
})
export class ReceivingCardModule {}
