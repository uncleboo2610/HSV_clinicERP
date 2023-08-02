import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { Patient } from 'src/entities/patient.entity';
import { StaffTicket } from 'src/entities/staff-ticket.entity';
import { Staff } from 'src/entities/staff.entity';
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
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
