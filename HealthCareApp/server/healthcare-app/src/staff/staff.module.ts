import { Module } from '@nestjs/common';
import { StaffService } from './services/staff/staff.service';
import { StaffController } from './controllers/staff/staff.controller';
import { Department } from 'src/entities/department.entity';
import { Staff } from 'src/entities/staff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffTicket } from 'src/entities/staff-ticket.entity';
import { Patient } from 'src/entities/patient.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Staff, Department, StaffTicket, Patient
  ]),
  JwtModule.register({
    global: true,
    secret: process.env.SECRET_JWT_CODE,
    signOptions: { expiresIn: '1d' },
  }),
  ],
  providers: [StaffService],
  controllers: [StaffController]
})
export class StaffModule {}
