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

    getPrescriptions() {
        const rawQueryString = `select p.id, p.note, drug.drugName, pd.drugId from prescription p
                                inner join (select note, prescriptionId, drugId from prescription_detail) pd on pd.prescriptionId = p.id
                                inner join (select id, drugName from drug) drug on pd.drugId = drug.id`;

        // return this.prescriptionRepository.find({ relations: ['prescriptionDetail'] });
        return this.prescriptionRepository.query(rawQueryString);
    }

    getPrescriptionById(id: number) {
        const rawQueryString = `select p.id, p.note, drug.drugName, pd.drugId from prescription p
                                inner join (select note, prescriptionId, drugId from prescription_detail) pd on pd.prescriptionId = p.id
                                inner join (select id, drugName from drug) drug on pd.drugId = drug.id
                                where p.id = ${id}`;

        return this.prescriptionRepository.query(rawQueryString);
    }

    getPrescriptionDetails() {
        return this.prescriptionDetailRepository.find({ relations: ['drug', 'prescription'] });
    }

    createPrescription(prescriptionData: PrescriptionParams) {
        const newPrescription = this.prescriptionRepository.create({
            ...prescriptionData,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        return this.prescriptionRepository.save(newPrescription);
    }

    async createPrescriptionDetail(prescriptionDetailData: PrescriptionDetailParams, prescriptionId: number, drugId: number[]) {
        const prescription = await this.prescriptionRepository.findOneBy({ id: prescriptionId });
        drugId.map(async (id) => {
            const drug = await this.prescriptionRepository.findOneBy({ id: id })
            const newPrescription = this.prescriptionDetailRepository.create({
                ...prescriptionDetailData,
                prescription,
                drug,
            });
            return this.prescriptionDetailRepository.save(newPrescription);
        })
    }
}