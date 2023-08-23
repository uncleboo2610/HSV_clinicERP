import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalStorage } from 'src/entities/medical-storage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicalStorageService {

    constructor(
        @InjectRepository(MedicalStorage) private medicalStorageRepository: Repository<MedicalStorage>
    ) {}

    getMedicalStorages() {
        return this.medicalStorageRepository.find();
    }

    getMedicalStorageById(id: number) {
        return this.medicalStorageRepository.findOne({
            where : {id: id},
            relations: ['drug']
        });
    }
}
