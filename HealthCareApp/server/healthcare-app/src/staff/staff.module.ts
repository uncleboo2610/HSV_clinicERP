import { Module } from '@nestjs/common';
import { StaffService } from './services/staff/staff.service';
import { StaffController } from './controllers/staff/staff.controller';
import { Department } from 'src/entities/department.entity';
import { Staff } from 'src/entities/staff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Department])],
  providers: [StaffService],
  controllers: [StaffController]
})
export class StaffModule {}
