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
        // return this.icdRepository.createQueryBuilder('DM_ICD').select().offset(0).limit(100).getRawMany();
        return this.icdRepository.find()
    }

    getIcdPagination() {
        
    }
}
