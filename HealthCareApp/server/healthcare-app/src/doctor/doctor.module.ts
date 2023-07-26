import { Module } from '@nestjs/common';
import { DoctorService } from './services/doctor/doctor.service';
import { DoctorController } from './controllers/doctor/doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/entities/doctor.entity';
import { Department } from 'src/entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Department])],
  providers: [DoctorService],
  controllers: [DoctorController]
})
export class DoctorModule {}
