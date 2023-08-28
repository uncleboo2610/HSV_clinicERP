import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICD } from 'src/entities/ICD.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IcdService {

    constructor (
        @InjectRepository(ICD) private icdRepository: Repository<ICD>
    ) {}

    getIcd() {
        return this.icdRepository.find()
    }
    
    getIcdById(IcdId) {
        return this.icdRepository
            .createQueryBuilder('DM_ICD')
            .select()
            .where('DM_ICD.ICD_id like :startId', {startId: `${IcdId}%`})
            .limit(1000)
            .getRawMany()
    }
}
