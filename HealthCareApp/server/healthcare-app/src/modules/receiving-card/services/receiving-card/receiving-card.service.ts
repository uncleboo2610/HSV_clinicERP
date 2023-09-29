import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { Patient } from 'src/entities/patient.entity';
import { ReceivingCardDetail } from 'src/entities/receiving-card-detail.entity';
import { ReceivingCard } from 'src/entities/receiving-card.entity';
import { Repository } from 'typeorm';
import { ReceivingCardParams } from '../../utils/types';

@Injectable()
export class ReceivingCardService {

    constructor(
        @InjectRepository(ReceivingCard) private receivingCardRepository: Repository<ReceivingCard>,
        @InjectRepository(ReceivingCardDetail) private receivingCardDetailRepository: Repository<ReceivingCardDetail>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
        @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    ) {}

    getReceivingCards() {
        return this.receivingCardRepository.find({ relations: ['patient', 'receivingCardDetail'] });
    }

    getReceivingCardDetails() {
        return this.receivingCardDetailRepository.find({ relations: ['patient', 'receivingCard', 'department'] });
    }

    async createReceivingCard(patientId: string, receivingCardParams: ReceivingCardParams) {
        const patient = await this.patientRepository.findOneBy({ id: patientId })

        if(!patient) {
            throw new BadRequestException('This patient does not exist !!!');
        }

        const newReceivingCard = this.receivingCardRepository.create({
            ...receivingCardParams,
            patient,
            receivingDate: new Date(),
            updatedAt: new Date()
        });

        return this.receivingCardRepository.save(newReceivingCard);
    }

    async createReceivingCardDetail(patientId: string, receivingCardId: string, departmentId: number) {
        const patient = await this.patientRepository.findOneBy({ id: patientId });
        const department = await this.departmentRepository.findOneBy({ id: departmentId });
        const receivingCard = await this.receivingCardRepository.findOneBy({ id: receivingCardId });

        if(!department) {
            throw new BadRequestException('This department does not exist !!!');
        }

        const newReceivingCard = this.receivingCardDetailRepository.create({
            department,
            patient,
            receivingCard,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return this.receivingCardDetailRepository.save(newReceivingCard);
    }

    async updateReceivingCard(id: string, receivingCardDetails: ReceivingCardParams) {
        return this.receivingCardRepository.update({ id }, { 
            ...receivingCardDetails,
            updatedAt: new Date()
        });
    }

    deleteReceivingCard(id: string) {
        return this.receivingCardRepository.delete({ id });
    }
}
