import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Drug } from 'src/entities/drug.entity';
import { TypeDrug } from 'src/entities/type-drug.entity';
import { Repository } from 'typeorm';
import { DrugDto } from '../../dtos/Drug.dto';

@Injectable()
export class DrugService {

    constructor(
        @InjectRepository(Drug) private drugRepository: Repository<Drug>,
        @InjectRepository(TypeDrug) private typeDrugRepository: Repository<TypeDrug>,
    ) {}

    getDrugs() {
        return this.drugRepository.find({});
    }

    getTypeDrugs() {
        return this.typeDrugRepository.find({});
    }

    async createDrug(drugData: DrugDto, typeDrugId: number) {
        const typeDrug = await this.typeDrugRepository.findOneBy({id: typeDrugId});

        const newDrug = this.drugRepository.create({
            ...drugData,
            typeDrug,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return this.drugRepository.save(newDrug);
    }
}
