import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Drug } from 'src/entities/drug.entity';
import { PharmaceuticalGoodsIssueNote } from 'src/entities/pharmaceutical-goods-issue-note';
import { PharmaceuticalGoodsIssueNoteDetail } from 'src/entities/pharmaceutical-goods-issue-note-detail';
import { PharmaceuticalGoodsReceiptNote } from 'src/entities/pharmaceutical-goods-receipt-note';
import { PharmaceuticalGoodsReceiptNoteDetail } from 'src/entities/pharmaceutical-goods-receipt-note-detail';
import { PharmaceuticalWarehouse } from 'src/entities/pharmaceutical-warehouse.entity';
import { DrugService } from 'src/modules/drug/services/drug/drug.service';
import { Repository } from 'typeorm';
import { PharmaceuticalGoodsReceiptNoteParams, PharmaceuticalGoodsReceiptParams, PharmaceuticalGoodsIssueNoteParams, PharmaceuticalGoodsIssueParams } from '../../utils/types';

@Injectable()
export class PharmaceuticalWarehouseService {

    constructor(
        @InjectRepository(PharmaceuticalWarehouse) private pharmaceuticalWarehouseRepository: Repository<PharmaceuticalWarehouse>,
        @InjectRepository(PharmaceuticalGoodsReceiptNote) private pharmaceuticalGoodsReceiptNoteRepository: Repository<PharmaceuticalGoodsReceiptNote>,
        @InjectRepository(PharmaceuticalGoodsReceiptNoteDetail) private pharmaceuticalGoodsReceiptNoteDetailRepository: Repository<PharmaceuticalGoodsReceiptNoteDetail>,
        @InjectRepository(PharmaceuticalGoodsIssueNote) private pharmaceuticalGoodsIssueNoteRepository: Repository<PharmaceuticalGoodsIssueNote>,
        @InjectRepository(PharmaceuticalGoodsIssueNoteDetail) private pharmaceuticalGoodsIssueNoteDetailRepository: Repository<PharmaceuticalGoodsIssueNoteDetail>,
        @InjectRepository(Drug) private drugRepository: Repository<Drug>,
        //Services
        private drugService: DrugService,
    ) {}

    getPharmaceuticalWarehouses() {
        return this.pharmaceuticalWarehouseRepository.find({relations: ['drug', 'drug.typeDrug']});
    }

    getPharmaceuticalGoodsReceiptNote() {
        return this.pharmaceuticalGoodsReceiptNoteRepository.find({relations: ['pharmaceuticalGoodsReceiptNoteDetail.medicine', 'pharmaceuticalGoodsReceiptNoteDetail']});
    }

    getPharmaceuticalGoodsIssueNote() {
        return this.pharmaceuticalGoodsIssueNoteRepository.find({relations: ['pharmaceuticalGoodsIssueNoteDetail.medicine', 'pharmaceuticalGoodsIssueNoteDetail']});
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

    createPharmaceuticalGoodsReceiptNote(pharmaceuticalGoodsReceiptNoteParams: PharmaceuticalGoodsReceiptNoteParams) {
        pharmaceuticalGoodsReceiptNoteParams.inputInStock = `Phòng khám`;
        pharmaceuticalGoodsReceiptNoteParams.location = `Đường số 2`;

        const newPharmaceuticalGoodsReceiptNote = this.pharmaceuticalGoodsReceiptNoteRepository.create({
            ...pharmaceuticalGoodsReceiptNoteParams,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return this.pharmaceuticalGoodsReceiptNoteRepository.save(newPharmaceuticalGoodsReceiptNote);
    }

    async createPharmaceuticalGoodsReceipt(pharmaceuticalGoodsReceiptParams: PharmaceuticalGoodsReceiptParams[], noteId: number) {
        const note = await this.pharmaceuticalGoodsReceiptNoteRepository.findOneBy({ id: noteId });

        pharmaceuticalGoodsReceiptParams.map(async (data) => {
            if (!data.typeDrugName) throw new BadRequestException();

            if (data.typeDrugName === 'BHYT') {
                data.typeDrugId = 1
            } else {
                data.typeDrugId = 2
            };

            const medicine = await this.drugRepository.findOneBy({drugName: data.drugName});
            
            if(medicine) {
                const noteDetail = await this.pharmaceuticalGoodsReceiptNoteDetailRepository.create({
                    medicine: medicine,
                    quantity: data.quantity,
                    pharmaceuticalGoodsReceiptNote: note
                });
                return {
                    updated: this.updatePharmaceuticalGoodsReceipt(data.quantity, medicine.id),
                    noteDetail: this.pharmaceuticalGoodsReceiptNoteDetailRepository.save(noteDetail)
                };
            } else {
                const newMedicine = await this.drugService.createDrug(data, data.typeDrugId);
                const noteDetail = await this.pharmaceuticalGoodsReceiptNoteDetailRepository.create({
                    medicine: newMedicine,
                    quantity: data.quantity,
                    pharmaceuticalGoodsReceiptNote: note
                });
    
                return {
                    updated: this.createPharmaceuticalWarehouse(data.quantity, newMedicine.id),
                    noteDetail: this.pharmaceuticalGoodsReceiptNoteDetailRepository.save(noteDetail)
                }
            }
        });
    }

    createPharmaceuticalGoodsIssueNote(pharmaceuticalGoodsIssueNoteParams: PharmaceuticalGoodsIssueNoteParams) {
        pharmaceuticalGoodsIssueNoteParams.exportInStock = `Phòng khám`;
        pharmaceuticalGoodsIssueNoteParams.location = `Đường số 2`;

        const newPharmaceuticalGoodsIssueNote = this.pharmaceuticalGoodsIssueNoteRepository.create({
            ...pharmaceuticalGoodsIssueNoteParams,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return this.pharmaceuticalGoodsIssueNoteRepository.save(newPharmaceuticalGoodsIssueNote);
    }

    async updatePharmaceuticalGoodsReceipt(quantity: number, id: number) {
        const pharmaceuticalWarehouseById = await this.pharmaceuticalWarehouseRepository.findOneBy({id: id});

        return await this.pharmaceuticalWarehouseRepository.update({ id: id }, {
            quantity: pharmaceuticalWarehouseById.quantity + quantity,
            updatedAt: new Date()
        });
    }

    async updatePharmaceuticalGoodsIssue(pharmaceuticalGoodsIssueParams: PharmaceuticalGoodsIssueParams[], noteId: number) {
        const note = await this.pharmaceuticalGoodsIssueNoteRepository.findOneBy({ id: noteId });

        pharmaceuticalGoodsIssueParams.map(async(data) => {
            const pharmaceuticalWarehouseById = await this.pharmaceuticalWarehouseRepository.findOneBy({id: data.drugId});
            const medicine = await this.drugRepository.findOneBy({id: data.drugId});

            const noteDetail = await this.pharmaceuticalGoodsIssueNoteDetailRepository.create({
                medicine: medicine,
                quantity: data.quantity,
                pharmaceuticalGoodsIssueNote: note
            });
    
            return {
                detail: await this.pharmaceuticalGoodsIssueNoteDetailRepository.save(noteDetail),
                updated: await this.pharmaceuticalWarehouseRepository.update({ id: data.drugId }, {
                    quantity: pharmaceuticalWarehouseById.quantity - data.quantity,
                    updatedAt: new Date(),
                })
            };
        })
    }

    async updatePharmaceuticalWarehouseByPrescription(quantity: number, id: number) {
        const pharmaceuticalWarehouseById = await this.pharmaceuticalWarehouseRepository.findOneBy({id: id});

        return await this.pharmaceuticalWarehouseRepository.update({ id: id }, {
            quantity: pharmaceuticalWarehouseById.quantity - quantity,
            updatedAt: new Date()
        });
    }
}
