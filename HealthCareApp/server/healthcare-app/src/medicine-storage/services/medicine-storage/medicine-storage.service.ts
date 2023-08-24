import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Drug } from 'src/entities/drug.entity';
import { MedicineStorage } from 'src/entities/medicine-storage.entity';
import { MedicineStorageParams } from 'src/medicine-storage/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class MedicineStorageService {

    constructor(
        @InjectRepository(MedicineStorage) private medicineStorageRepository: Repository<MedicineStorage>,
        @InjectRepository(Drug) private drugRepository: Repository<Drug>,
    ) {}

    getMedicineStorages() {
        return this.medicineStorageRepository.find({relations: ['drug', 'drug.typeDrug']});
    }

    async createMedicineStorage(medicineStorageParams: MedicineStorageParams, drugId: number) {
        const medicine = await this.drugRepository.findOneBy({id: drugId});

        const newMedicineStorage = this.medicineStorageRepository.create({
            ...medicineStorageParams,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        newMedicineStorage.drug = medicine;

        return this.medicineStorageRepository.save(newMedicineStorage);
    }
}
