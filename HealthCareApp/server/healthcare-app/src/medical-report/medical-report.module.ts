import { Module } from '@nestjs/common';
import { MedicalReportController } from './controllers/medical-report/medical-report.controller';
import { MedicalReportService } from './services/medical-report/medical-report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalReport } from 'src/entities/medical-report.entity';
import { Patient } from 'src/entities/patient.entity';
import { Doctor } from 'src/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalReport, Patient, Doctor])],
  controllers: [MedicalReportController],
  providers: [MedicalReportService]
})
export class MedicalReportModule {}
