import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/entities/doctor.entity';
import { MedicalReport } from 'src/entities/medical-report.entity';
import { Patient } from 'src/entities/patient.entity';
import { MedicalReportDto } from 'src/medical-report/dtos/MedicalReport.dto';
import { CreateMedicalReportParams } from 'src/medical-report/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class MedicalReportService {

    constructor(
        @InjectRepository(MedicalReport) private medicalReportRepository: Repository<MedicalReport>,
        @InjectRepository(Patient) private patientRepository: Repository<Patient>,
        @InjectRepository(Doctor) private doctorRepository: Repository<Doctor>,
    ) {}

    getMedicalReports() {
        return this.medicalReportRepository.find({ relations: ['patient', 'doctor'] });
    }

    async createMedicalReport(id: string, medicalReportDetails: CreateMedicalReportParams, doctorId: string) {
        const patient = await this.patientRepository.findOneBy({ id });
        const doctor = await this.doctorRepository.findOneBy({ id: doctorId });

        if (!patient) {
            throw new BadRequestException('This patient does not exist !!!');
        }

        if (!doctor) {
            throw new BadRequestException('This doctor does not exist !!!');
        }

        const newMedicalReport = this.medicalReportRepository.create({
            ...medicalReportDetails,
            patient,
            doctor,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return await this.medicalReportRepository.save(newMedicalReport);
    }

    updateMedicalReport(id: string, medicalReportDetails: MedicalReportDto) {
        return this.medicalReportRepository.update({ id }, { ...medicalReportDetails, updatedAt: new Date() });
    }

    deleteMedicalReport(id: string) {
        return this.medicalReportRepository.delete({ id });
    }
}
