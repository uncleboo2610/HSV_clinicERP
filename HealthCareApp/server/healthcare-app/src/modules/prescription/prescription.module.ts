import { Module } from '@nestjs/common';
import { PrescriptionController } from './controllers/prescription/prescription.controller';
import { PrescriptionService } from './services/prescription/prescription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from 'src/entities/prescription.entity';
import { PrescriptionDetail } from 'src/entities/prescription-detail.entity';
import { Drug } from 'src/entities/drug.entity';
import { Patient } from 'src/entities/patient.entity';
import { MedicalReport } from 'src/entities/medical-report.entity';
import { TypePrescription } from 'src/entities/type-prescription.entity';
import { PharmaceuticalWarehouse } from 'src/entities/pharmaceutical-warehouse.entity';
import { TypeDrug } from 'src/entities/type-drug.entity';
import { PharmaceuticalGoodsReceiptNoteDetail } from 'src/entities/pharmaceutical-goods-receipt-note-detail';
import { PharmaceuticalGoodsReceiptNote } from 'src/entities/pharmaceutical-goods-receipt-note';
import { PharmaceuticalGoodsIssueNote } from 'src/entities/pharmaceutical-goods-issue-note';
import { PharmaceuticalGoodsIssueNoteDetail } from 'src/entities/pharmaceutical-goods-issue-note-detail';
import { PharmaceuticalWarehouseService } from '../pharmaceutical-warehouse/services/pharmaceutical-warehouse/pharmaceutical-warehouse.service';
import { DrugService } from '../drug/services/drug/drug.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Prescription, 
    PrescriptionDetail, 
    Drug, 
    Patient, 
    MedicalReport, 
    TypePrescription, 
    PharmaceuticalWarehouse, 
    TypeDrug,
    PharmaceuticalGoodsReceiptNote,
    PharmaceuticalGoodsReceiptNoteDetail,
    PharmaceuticalGoodsIssueNote,
    PharmaceuticalGoodsIssueNoteDetail
  ])],
  controllers: [PrescriptionController],
  providers: [PrescriptionService, PharmaceuticalWarehouseService, DrugService]
})
export class PrescriptionModule {}
