import { Module } from '@nestjs/common';
import { DrugService } from './services/drug/drug.service';
import { DrugController } from './controllers/drug/drug.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drug } from 'src/entities/drug.entity';
import { Prescription } from 'src/entities/prescription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drug, Prescription])],
  providers: [DrugService],
  controllers: [DrugController]
})
export class DrugModule {}
