import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugService } from 'src/drug/services/drug/drug.service';
import { Drug } from 'src/entities/drug.entity';
import { PharmaceuticalWarehouse } from 'src/entities/pharmaceutical-warehouse.entity';
import { PharmaceuticalGoodsIssueParams, PharmaceuticalGoodsReceiptParams } from 'src/pharmaceutical-warehouse/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class PharmaceuticalWarehouseService {

    constructor(
        @InjectRepository(PharmaceuticalWarehouse) private pharmaceuticalWarehouseRepository: Repository<PharmaceuticalWarehouse>,
        @InjectRepository(Drug) private drugRepository: Repository<Drug>,
        //Services
        private drugService: DrugService,
    ) {}

    getPharmaceuticalWarehouses() {
        return this.pharmaceuticalWarehouseRepository.find({relations: ['drug', 'drug.typeDrug']});
    }

    async createPharmaceuticalWarehouse(quantity: number, drugId: number) {
        const medicine = await this.drugRepository.findOneBy({id: drugId});

        const newPharmaceuticalWarehouse = this.pharmaceuticalWarehouseRepository.create({
            quantity: quantity,
            id: medicine.id,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        newPharmaceuticalWarehouse.drug = medicine;

        return this.pharmaceuticalWarehouseRepository.save(newPharmaceuticalWarehouse);
    }

    async updatePharmaceuticalGoodsReceipt(quantity: number, id: number) {
        const pharmaceuticalWarehouseById = await this.pharmaceuticalWarehouseRepository.findOneBy({id: id});

        return await this.pharmaceuticalWarehouseRepository.update({ id: id }, {
            quantity: pharmaceuticalWarehouseById.quantity + quantity,
            updatedAt: new Date()
        });
    }

    async updatePharmaceuticalGoodsIssue(pharmaceuticalGoodsReceiptParams: PharmaceuticalGoodsIssueParams[]) {
        pharmaceuticalGoodsReceiptParams.map(async(data) => {
            const pharmaceuticalWarehouseById = await this.pharmaceuticalWarehouseRepository.findOneBy({id: data.drugId});
    
            return await this.pharmaceuticalWarehouseRepository.update({ id: data.drugId }, {
                quantity: pharmaceuticalWarehouseById.quantity - data.quantity,
                updatedAt: new Date(),
            });
        })
    }

    async updatePharmaceuticalWarehouseByPrescription(quantity: number, id: number) {
        const pharmaceuticalWarehouseById = await this.pharmaceuticalWarehouseRepository.findOneBy({id: id});

        return await this.pharmaceuticalWarehouseRepository.update({ id: id }, {
            quantity: pharmaceuticalWarehouseById.quantity - quantity,
            updatedAt: new Date()
        });
    }

    async createPharmaceuticalGoodsReceipt(pharmaceuticalGoodsReceiptParams: PharmaceuticalGoodsReceiptParams[]) {
        pharmaceuticalGoodsReceiptParams.map(async (data) => {
            if (!data.typeDrugName) throw new BadRequestException();

            if (data.typeDrugName === 'BHYT') {
                data.typeDrugId = 1
            } else {
                data.typeDrugId = 2
            };

            const medicine = await this.drugRepository.findOneBy({drugName: data.drugName});
            
            if(medicine) {
                return this.updatePharmaceuticalGoodsReceipt(data.quantity, medicine.id);
            } else {
                const newMedicine = await this.drugService.createDrug(data, data.typeDrugId);
    
                return this.createPharmaceuticalWarehouse(data.quantity, newMedicine.id)
            }
        });
    }
}
