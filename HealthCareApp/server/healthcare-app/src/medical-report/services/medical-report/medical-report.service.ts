import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICD } from 'src/entities/ICD.entity';
import { MedicalReport } from 'src/entities/medical-report.entity';
import { Patient } from 'src/entities/patient.entity';
import { Staff } from 'src/entities/staff.entity';
import { TypeSolution } from 'src/entities/type-solution.entity';
import { MedicalReportDto } from 'src/medical-report/dtos/MedicalReport.dto';
import { CreateMedicalReportParams, UpdateMedicalReportParams } from 'src/medical-report/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class MedicalReportService {

    constructor(
        @InjectRepository(MedicalReport) private medicalReportRepository: Repository<MedicalReport>,
        @InjectRepository(Patient) private patientRepository: Repository<Patient>,
        @InjectRepository(Staff) private staffRepository: Repository<Staff>,
        @InjectRepository(TypeSolution) private typeSolutionRepository: Repository<TypeSolution>,
        @InjectRepository(ICD) private icdRepository: Repository<ICD>,
    ) {}

    getMedicalReports() {
        return this.medicalReportRepository.find({relations: ['patient', 'staff', 'typeSolution', 'diseaseIcd', 'comorbidity']});
    }

    async createMedicalReport(
        id: string, 
        medicalReportDetails: CreateMedicalReportParams, 
        staffId: string, 
        typeSolutionId: number[],
        diseaseIcdId: string,
        comorbidityId: string[]
    ) {
        const patient = await this.patientRepository.findOneBy({ id });
        const staff = await this.staffRepository.findOneBy({ id: staffId });
        const diseaseIcd = await this.icdRepository.findOneBy({ MaICD: diseaseIcdId });
        const typeSolution = [];
        const comorbidity = [];
        
        if (!patient) {
            throw new BadRequestException('This patient does not exist !!!');
        };
        
        if (!staff) {
            throw new BadRequestException('This staff does not exist !!!');
        };

        await Promise.all(typeSolutionId.map(async(id) => {
            const data = await this.typeSolutionRepository.findOneBy({id: id})
            typeSolution.push(data)
        }));

        await Promise.all(comorbidityId.map(async(id) => {
            const data = await this.icdRepository.findOneBy({MaICD: id})
            comorbidity.push(data)
        }));
        
        const newMedicalReport = this.medicalReportRepository.create({
            ...medicalReportDetails,
            patient,
            staff,
            typeSolution,
            diseaseIcd,
            comorbidity,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return await this.medicalReportRepository.save(newMedicalReport);
    }

    updateMedicalReport(id: string, medicalReportDetails: UpdateMedicalReportParams) {
        return this.medicalReportRepository.update({ id }, { ...medicalReportDetails, updatedAt: new Date() });
    }

    deleteMedicalReport(id: string) {
        return this.medicalReportRepository.delete({ id });
    }
}
