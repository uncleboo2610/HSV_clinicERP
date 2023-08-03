import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrescriptionDetail } from 'src/entities/prescription-detail.entity';
import { Prescription } from 'src/entities/prescription.entity';
import { PrescriptionDetailParams, PrescriptionParams } from 'src/prescription/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class PrescriptionService {

    constructor(
        @InjectRepository(Prescription) private prescriptionRepository: Repository<Prescription>,
        @InjectRepository(PrescriptionDetail) private prescriptionDetailRepository: Repository<PrescriptionDetail>
    ) {}

    getPrescription() {
        return this.prescriptionRepository.find();
    }

    getPrescriptionDetail() {
        return this.prescriptionDetailRepository.find();
    }

    createPrescription(prescriptionData: PrescriptionParams) {
        const newPrescription = this.prescriptionRepository.create({
            ...prescriptionData,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        return this.prescriptionRepository.save(newPrescription);
    }

    async createPrescriptionDetail(prescriptionDetailData: PrescriptionDetailParams, prescriptionId: number) {
        const prescription = await this.prescriptionRepository.findOneBy({ id: prescriptionId })
        const newPrescription = this.prescriptionDetailRepository.create({
            ...prescriptionDetailData,
            prescription,
        });
        
        return this.prescriptionDetailRepository.save(newPrescription);
    }
}
