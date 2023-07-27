import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalReport } from 'src/entities/medical-report.entity';
import { Patient } from 'src/entities/patient.entity';
import { Staff } from 'src/entities/staff.entity';
import { MedicalReportDto } from 'src/medical-report/dtos/MedicalReport.dto';
import { CreateMedicalReportParams } from 'src/medical-report/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class MedicalReportService {

    constructor(
        @InjectRepository(MedicalReport) private medicalReportRepository: Repository<MedicalReport>,
        @InjectRepository(Patient) private patientRepository: Repository<Patient>,
        @InjectRepository(Staff) private staffRepository: Repository<Staff>,
    ) {}

    getMedicalReports() {
        return this.medicalReportRepository.find({ relations: ['patient', 'staff'] });
    }

    async createMedicalReport(id: string, medicalReportDetails: CreateMedicalReportParams, staffId: string) {
        const patient = await this.patientRepository.findOneBy({ id });
        const staff = await this.staffRepository.findOneBy({ id: staffId });

        if (!patient) {
            throw new BadRequestException('This patient does not exist !!!');
        }

        if (!staff) {
            throw new BadRequestException('This staff does not exist !!!');
        }

        const newMedicalReport = this.medicalReportRepository.create({
            ...medicalReportDetails,
            patient,
            staff,
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
