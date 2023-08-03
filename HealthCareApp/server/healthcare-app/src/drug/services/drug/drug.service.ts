import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugDto } from 'src/drug/dtos/Drug.dto';
import { Drug } from 'src/entities/drug.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DrugService {

    constructor(
        @InjectRepository(Drug) private drugRepository: Repository<Drug>,
    ) {}

    getDrug() {
        return this.drugRepository.find({});
    }

    createDrug(drugData: DrugDto) {
        const newDrug = this.drugRepository.create({
            ...drugData,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return this.drugRepository.save(newDrug);
    }
}
