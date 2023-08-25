import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { MedicalReport } from './entities/medical-report.entity';
import { PatientsModule } from './patients/patients.module';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { DepartmentModule } from './department/department.module';
import { ReceivingCardModule } from './receiving-card/receiving-card.module';
import { StaffModule } from './staff/staff.module';
import { Staff } from './entities/staff.entity';
import { GatewayModule } from './gateway/gateway.module';
import { TypeServiceModule } from './type-service/type-service.module';
import { StaffTicket } from './entities/staff-ticket.entity';
import { ParaclinicalModule } from './paraclinical/paraclinical.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { DrugModule } from './drug/drug.module';
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
import { ImaginingDiagnosticModule } from './image/imagining-diagnostic/imagining-diagnostic.module';
import { TypePrescription } from './entities/type-prescription.entity';
import { TypeDrug } from './entities/type-drug.entity';
import { MedicineStorage } from './entities/medicine-storage.entity';
import { MedicineStorageModule } from './medicine-storage/medicine-storage.module';
import { TypeSolution } from './entities/type-solution.entity';
import { TypeSolutionModule } from './type-solution/type-solution.module';

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
        MedicineStorage,
        Department, 
        Drug, 
        ParaclinicalReport, 
        Prescription, 
        PrescriptionDetail, 
        ReceivingCard, 
        ReceivingCardDetail, 
        StaffTicketDetail, 
        StaffTicket, 
        TypeService,
        TypePrescription,
        TypeDrug,
        TypeSolution
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
      DrugModule, ImaginingDiagnosticModule, MedicineStorageModule, TypeSolutionModule, 
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
