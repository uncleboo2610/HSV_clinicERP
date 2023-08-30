import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Drug } from 'src/entities/drug.entity';
import { PharmaceuticalWarehouse } from 'src/entities/pharmaceutical-warehouse.entity';
import { PharmaceuticalWarehouseParams } from 'src/pharmaceutical-warehouse/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class PharmaceuticalWarehouseService {

    constructor(
        @InjectRepository(PharmaceuticalWarehouse) private pharmaceuticalWarehouseRepository: Repository<PharmaceuticalWarehouse>,
        @InjectRepository(Drug) private drugRepository: Repository<Drug>,
    ) {}

    getPharmaceuticalWarehouses() {
        return this.pharmaceuticalWarehouseRepository.find({relations: ['drug', 'drug.typeDrug']});
    }

    async createPharmaceuticalWarehouse(pharmaceuticalWarehouseParams: PharmaceuticalWarehouseParams, drugId: number) {
        const medicine = await this.drugRepository.findOneBy({id: drugId});

        const newPharmaceuticalWarehouse = this.pharmaceuticalWarehouseRepository.create({
            ...pharmaceuticalWarehouseParams,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        newPharmaceuticalWarehouse.drug = medicine;

        return this.pharmaceuticalWarehouseRepository.save(newPharmaceuticalWarehouse);
    }

    async updatePharmaceuticalWarehouseByPrescription(quantity: number, id: number) {
        const pharmaceuticalWarehouseById = await this.pharmaceuticalWarehouseRepository.findOneBy({id: id});

        return await this.pharmaceuticalWarehouseRepository.update({ id: id }, {
            quantity: pharmaceuticalWarehouseById.quantity - quantity,
            updatedAt: new Date()
        });
    }
}
