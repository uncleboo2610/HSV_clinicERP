import { Module } from '@nestjs/common';
import { MedicineStorageService } from './services/medicine-storage/medicine-storage.service';
import { MedicineStorageController } from './controllers/medicine-storage/medicine-storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drug } from 'src/entities/drug.entity';
import { MedicineStorage } from 'src/entities/medicine-storage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineStorage, Drug])],
  providers: [MedicineStorageService],
  controllers: [MedicineStorageController]
})
export class MedicineStorageModule {}
