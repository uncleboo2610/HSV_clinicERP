import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { Patient } from 'src/entities/patient.entity';
import { ReceivingCard } from 'src/entities/receiving-card.entity';
import { ReceivingCardParams } from 'src/receiving-card/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ReceivingCardService {

    constructor(
        @InjectRepository(ReceivingCard) private receivingCardRepository: Repository<ReceivingCard>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
        @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    ) {}

    getReceivingCards() {
        return this.receivingCardRepository.find({ relations: ['department'] });
    }

    async createReceivingCard(patientId: string, receivingCardDetails: ReceivingCardParams, departmentId: number) {
        const patient = await this.patientRepository.findOneBy({ id: patientId })
        const department = await this.departmentRepository.findOneBy({ id: departmentId });

        if(!patient) {
            throw new BadRequestException('This patient does not exist !!!');
        }

        if(!department) {
            throw new BadRequestException('This department does not exist !!!');
        }

        const newReceivingCard = this.receivingCardRepository.create({
            ...receivingCardDetails,
            department,
            patient,
            receivingDate: new Date(),
            updatedAt: new Date()
        });

        return this.receivingCardRepository.save(newReceivingCard);
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
