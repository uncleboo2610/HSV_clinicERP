import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { MedicalReport } from './entities/medical-report.entity';
import { Staff } from './entities/staff.entity';
import { GatewayModule } from './gateway/gateway.module';
import { StaffTicket } from './entities/staff-ticket.entity';
import { ConfigModule } from '@nestjs/config';
import { Department } from './entities/department.entity';
import { Drug } from './entities/drug.entity';
import { ParaclinicalReport } from './entities/paraclinical-report.entity';
import { Prescription } from './entities/prescription.entity';
import { PrescriptionDetail } from './entities/prescription-detail.entity';
import { ReceivingCard } from './entities/receiving-card.entity';
import { ReceivingCardDetail } from './entities/receiving-card-detail.entity';
import { StaffTicketDetail } from './entities/staff-ticket-detail.entity';
import { TypeService } from './entities/type-service.entity';
import { ImaginingDiagnostic } from './entities/imagining-diagnostic';
import { TypePrescription } from './entities/type-prescription.entity';
import { TypeDrug } from './entities/type-drug.entity';
import { PharmaceuticalWarehouse } from './entities/pharmaceutical-warehouse.entity';
import { TypeSolution } from './entities/type-solution.entity';
import { ICD } from './entities/ICD.entity';
import { PharmaceuticalGoodsReceiptNote } from './entities/pharmaceutical-goods-receipt-note';
import { PharmaceuticalGoodsReceiptNoteDetail } from './entities/pharmaceutical-goods-receipt-note-detail';
import { PharmaceuticalGoodsIssueNote } from './entities/pharmaceutical-goods-issue-note';
import { PharmaceuticalGoodsIssueNoteDetail } from './entities/pharmaceutical-goods-issue-note-detail';
import { AuthModule } from './modules/auth/auth.module';
import { DepartmentModule } from './modules/department/department.module';
import { DrugModule } from './modules/drug/drug.module';
import { IcdModule } from './modules/icd/icd.module';
import { ImaginingDiagnosticModule } from './modules/image/imagining-diagnostic/imagining-diagnostic.module';
import { MedicalReportModule } from './modules/medical-report/medical-report.module';
import { ParaclinicalModule } from './modules/paraclinical/paraclinical.module';
import { PatientsModule } from './modules/patients/patients.module';
import { PharmaceuticalWarehouseModule } from './modules/pharmaceutical-warehouse/pharmaceutical-warehouse.module';
import { PrescriptionModule } from './modules/prescription/prescription.module';
import { ReceivingCardModule } from './modules/receiving-card/receiving-card.module';
import { StaffModule } from './modules/staff/staff.module';
import { TypeServiceModule } from './modules/type-service/type-service.module';
import { TypeSolutionModule } from './modules/type-solution/type-solution.module';

const healthcare_image = TypeOrmModule.forRoot({
  name: 'healthcare_image',
  type: 'mssql',
      host: process.env.DATABASE_HOST,
      port: 1433,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'healthcare_image',
      entities: [
        ImaginingDiagnostic
      ],
      synchronize: true,
      autoLoadEntities: true,
      options: {
        encrypt: true,
      },
      extra: {
        validateConnection: false,
        trustServerCertificate: true,
      },
})

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DATABASE_HOST,
      port: 1433,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Staff, 
        Patient, 
        MedicalReport,
        Department, 
        Drug, 
        PharmaceuticalWarehouse,
        ParaclinicalReport, 
        Prescription, 
        PrescriptionDetail, 
        PharmaceuticalGoodsReceiptNote,
        PharmaceuticalGoodsReceiptNoteDetail,
        ReceivingCard, 
        ReceivingCardDetail, 
        StaffTicketDetail, 
        StaffTicket, 
        TypeService,
        TypePrescription,
        TypeDrug,
        TypeSolution,
        ICD
      ],
      synchronize: true,
      autoLoadEntities: true,
      options: {
        encrypt: true,
      },
      extra: {
        validateConnection: false,
        trustServerCertificate: true,
      },
    }), 
    healthcare_image,
      PatientsModule, 
      MedicalReportModule, 
      StaffModule, 
      DepartmentModule, 
      ReceivingCardModule, 
      StaffModule, 
      GatewayModule, 
      TypeServiceModule, 
      StaffTicket, 
      ParaclinicalModule, 
      AuthModule, 
      PrescriptionModule, 
      DrugModule, 
      ImaginingDiagnosticModule, 
      TypeSolutionModule, 
      IcdModule, 
      PharmaceuticalWarehouseModule, 
      PharmaceuticalGoodsIssueNote,
      PharmaceuticalGoodsIssueNoteDetail
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
