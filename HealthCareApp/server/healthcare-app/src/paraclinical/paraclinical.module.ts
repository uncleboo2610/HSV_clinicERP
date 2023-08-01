import { Module } from '@nestjs/common';
import { ParaclinicalService } from './services/paraclinical/paraclinical.service';
import { ParaclinicalController } from './controllers/paraclinical/paraclinical.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParaclinicalReport } from 'src/entities/paraclinical-report.entity';
import { Staff } from 'src/entities/staff.entity';
import { Patient } from 'src/entities/patient.entity';
import { TypeService } from 'src/entities/type-service.entity';
import { StaffTicket } from 'src/entities/staff-ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ ParaclinicalReport, Staff, Patient, TypeService, StaffTicket])],
  providers: [ParaclinicalService],
  controllers: [ParaclinicalController]
})
export class ParaclinicalModule {}
