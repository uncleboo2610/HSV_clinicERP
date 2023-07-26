import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Patient } from './entities/patient.entity';
import { MedicalReport } from './entities/medical-report.entity';
import { PatientsModule } from './patients/patients.module';
import { MedicalReportModule } from './medical-report/medical-report.module';
import { DoctorModule } from './doctor/doctor.module';
import { DepartmentModule } from './department/department.module';
import { ReceivingCardModule } from './receiving-card/receiving-card.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'test12345',
      database: 'healthcare',
      entities: [Doctor, Patient, MedicalReport],
      synchronize: true,
      autoLoadEntities: true,
      options: {
        encrypt: true,
      },
      extra: {
        validateConnection: false,
        trustServerCertificate: true,
      },
  }), PatientsModule, MedicalReportModule, DoctorModule, DepartmentModule, ReceivingCardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
