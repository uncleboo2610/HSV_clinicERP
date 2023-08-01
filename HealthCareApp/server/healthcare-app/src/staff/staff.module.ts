import { Module } from '@nestjs/common';
import { StaffService } from './services/staff/staff.service';
import { StaffController } from './controllers/staff/staff.controller';
import { Department } from 'src/entities/department.entity';
import { Staff } from 'src/entities/staff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffTicket } from 'src/entities/staff-ticket.entity';
import { Patient } from 'src/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Department, StaffTicket, Patient])],
  providers: [StaffService],
  controllers: [StaffController]
})
export class StaffModule {}
