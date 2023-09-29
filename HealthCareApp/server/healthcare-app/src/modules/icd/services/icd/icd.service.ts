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
    
    getIcdById(groupId) {
        return this.icdRepository
            .createQueryBuilder('DM_ICD')
            .select()
            .where('DM_ICD.MaICD like :groupId', {groupId: `${groupId}%`})
            .limit(1000)
            .getRawMany()
    }
}
