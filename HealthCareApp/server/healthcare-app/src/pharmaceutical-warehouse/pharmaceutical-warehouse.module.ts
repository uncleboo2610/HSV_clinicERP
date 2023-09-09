import { Module } from '@nestjs/common';
import { PharmaceuticalWarehouseService } from './services/pharmaceutical-warehouse/pharmaceutical-warehouse.service';
import { PharmaceuticalWarehouseController } from './controllers/pharmaceutical-warehouse/pharmaceutical-warehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drug } from 'src/entities/drug.entity';
import { PharmaceuticalWarehouse } from 'src/entities/pharmaceutical-warehouse.entity';
import { DrugService } from 'src/drug/services/drug/drug.service';
import { TypeDrug } from 'src/entities/type-drug.entity';
import { PharmaceuticalGoodsReceiptNote } from 'src/entities/pharmaceutical-goods-receipt-note';
import { PharmaceuticalGoodsReceiptNoteDetail } from 'src/entities/pharmaceutical-goods-receipt-note-detail';
import { PharmaceuticalGoodsIssueNote } from 'src/entities/pharmaceutical-goods-issue-note';
import { PharmaceuticalGoodsIssueNoteDetail } from 'src/entities/pharmaceutical-goods-issue-note-detail';

@Module({
  imports: [TypeOrmModule.forFeature([
    PharmaceuticalWarehouse, 
    Drug, 
    TypeDrug, 
    PharmaceuticalGoodsReceiptNote, 
    PharmaceuticalGoodsReceiptNoteDetail, 
    PharmaceuticalGoodsIssueNote, 
    PharmaceuticalGoodsIssueNoteDetail
  ])],
  controllers: [PharmaceuticalWarehouseController],
  providers: [PharmaceuticalWarehouseService, DrugService]
})
export class PharmaceuticalWarehouseModule {}
