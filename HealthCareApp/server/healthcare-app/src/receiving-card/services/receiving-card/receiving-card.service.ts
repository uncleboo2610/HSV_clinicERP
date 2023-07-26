import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { ReceivingCard } from 'src/entities/receiving-card.entity';
import { ReceivingCardDto } from 'src/receiving-card/dtos/ReceivingCard.dto';
import { ReceivingCardParams } from 'src/receiving-card/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ReceivingCardService {

    constructor(
        @InjectRepository(ReceivingCard) private receivingCardRepository: Repository<ReceivingCard>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
    ) {}

    getReceivingCards() {
        return this.receivingCardRepository.find({ relations: ['department'] });
    }

    async createReceivingCard(receivingCardDetails: ReceivingCardParams, departmentId: number) {
        const department = await this.departmentRepository.findOneBy({ id: departmentId });

        if(!department) {
            throw new BadRequestException('This department does not exist !!!');
        }

        const newReceivingCard = this.receivingCardRepository.create({
            ...receivingCardDetails,
            department,
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
