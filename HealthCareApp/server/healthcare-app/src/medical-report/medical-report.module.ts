import { Module } from '@nestjs/common';
import { MedicalReportController } from './controllers/medical-report/medical-report.controller';
import { MedicalReportService } from './services/medical-report/medical-report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalReport } from 'src/entities/medical-report.entity';
import { Patient } from 'src/entities/patient.entity';
import { Staff } from 'src/entities/staff.entity';
import { TypeSolution } from 'src/entities/type-solution.entity';
import { ICD } from 'src/entities/ICD.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalReport, Patient, Staff, TypeSolution, ICD])],
  controllers: [MedicalReportController],
  providers: [MedicalReportService]
})
export class MedicalReportModule {}
