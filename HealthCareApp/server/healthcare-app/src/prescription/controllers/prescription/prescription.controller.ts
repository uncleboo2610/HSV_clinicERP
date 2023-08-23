import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrescriptionByIdDto, PrescriptionDetailDto, PrescriptionDto } from 'src/prescription/dtos/Prescription.dto';
import { PrescriptionService } from 'src/prescription/services/prescription/prescription.service';

@Controller('prescription')
export class PrescriptionController {

    constructor(
        private prescriptionService: PrescriptionService
    ) {}

    @Get('get-prescriptions')
    getPrescriptions() {
        return this.prescriptionService.getPrescriptions();
    }

    @Get('get-prescription-by-id/:id')
    getPrescriptionById(
        @Param('id') id: number
    ) {
        return this.prescriptionService.getPrescriptionById(id);
    }

    @Get('get-prescription-details')
    getPrescriptionDetails() {
        return this.prescriptionService.getPrescriptionDetails();
    }

    @Post('create-prescription')
    createPrescription(
        @Body() prescriptionDto: PrescriptionDto
    ) {
        return this.prescriptionService.createPrescription(prescriptionDto.patientId, prescriptionDto.medicalReportId, prescriptionDto.typePrescriptionId);
    }

    @Post('create-prescription-detail')
    createPrescriptionDetail(
        @Body() prescriptionDetailDto: PrescriptionDetailDto
    ) {
        return this.prescriptionService.createPrescriptionDetail(prescriptionDetailDto.drug, prescriptionDetailDto.prescriptionId);
    }
}
