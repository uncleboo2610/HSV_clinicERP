import { Module } from '@nestjs/common';
import { PharmaceuticalWarehouseService } from './services/pharmaceutical-warehouse/pharmaceutical-warehouse.service';
import { PharmaceuticalWarehouseController } from './controllers/pharmaceutical-warehouse/pharmaceutical-warehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drug } from 'src/entities/drug.entity';
import { PharmaceuticalWarehouse } from 'src/entities/pharmaceutical-warehouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PharmaceuticalWarehouse, Drug])],
  providers: [PharmaceuticalWarehouseService],
  controllers: [PharmaceuticalWarehouseController]
})
export class PharmaceuticalWarehouseModule {}
