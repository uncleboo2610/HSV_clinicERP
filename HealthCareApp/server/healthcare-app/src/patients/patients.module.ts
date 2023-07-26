import { Module } from '@nestjs/common';
import { PatientsController } from './controllers/patients/patients.controller';
import { PatientsService } from './services/patients/patients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/entities/patient.entity';
import { Doctor } from 'src/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Doctor])],
  controllers: [PatientsController],
  providers: [PatientsService]
})
export class PatientsModule {}
