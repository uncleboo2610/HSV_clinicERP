import { Body, Controller, Get, Post } from '@nestjs/common';
import { MedicineStorageDto } from 'src/medicine-storage/dtos/medicine-storage.dto';
import { MedicineStorageService } from 'src/medicine-storage/services/medicine-storage/medicine-storage.service';
@Controller('medicine-storage')
export class MedicineStorageController {

    constructor(
        private medicineStorageService: MedicineStorageService
    ) {}

    @Get('get-medicine-storages')
    getMedicalStorages(
    ) {
        return this.medicineStorageService.getMedicineStorages()
    }

    @Post('create-medicine-storage')
    createMedicalStorage(
        @Body() medicineStorageDto: MedicineStorageDto
    ) {
        return this.medicineStorageService.createMedicineStorage(medicineStorageDto, medicineStorageDto.drugId);
    }
}
