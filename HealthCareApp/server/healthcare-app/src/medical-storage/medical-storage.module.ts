import { Module } from '@nestjs/common';
import { MedicalStorageService } from './services/medical-storage/medical-storage.service';
import { MedicalStorageController } from './controllers/medical-storage/medical-storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalStorage } from 'src/entities/medical-storage.entity';
import { Drug } from 'src/entities/drug.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalStorage, Drug])],
  providers: [MedicalStorageService],
  controllers: [MedicalStorageController]
})
export class MedicalStorageModule {}
