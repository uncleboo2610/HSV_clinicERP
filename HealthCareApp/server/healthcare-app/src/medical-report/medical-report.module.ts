import { Module } from '@nestjs/common';
import { MedicalReportController } from './controllers/medical-report/medical-report.controller';
import { MedicalReportService } from './services/medical-report/medical-report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalReport } from 'src/entities/medical-report.entity';
import { Patient } from 'src/entities/patient.entity';
import { Staff } from 'src/entities/staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalReport, Patient, Staff])],
  controllers: [MedicalReportController],
  providers: [MedicalReportService]
})
export class MedicalReportModule {}
