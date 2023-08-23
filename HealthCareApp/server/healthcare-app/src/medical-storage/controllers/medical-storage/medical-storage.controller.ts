import { Controller, Get, Param } from '@nestjs/common';
import { MedicalStorageService } from 'src/medical-storage/services/medical-storage/medical-storage.service';

@Controller('medical-storage')
export class MedicalStorageController {

    constructor(
        private medicalStorageService: MedicalStorageService
    ) {}

    @Get('get-medical-storage-by-id/:id')
    getMedicalStorageById(
        @Param('id') id: number
    ) {
        return this.medicalStorageService.getMedicalStorageById(id)
    }
}
