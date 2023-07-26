import { Module } from '@nestjs/common';
import { DepartmentService } from './services/department/department.service';
import { DepartmentController } from './controllers/department/department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { Doctor } from 'src/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Doctor])],
  providers: [DepartmentService],
  controllers: [DepartmentController]
})
export class DepartmentModule {}
