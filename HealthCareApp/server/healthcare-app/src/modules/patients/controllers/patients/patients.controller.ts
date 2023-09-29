import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePatientDto } from '../../dtos/Patient.dto';
import { UpdatePatientDto } from '../../dtos/UpdatePatient.dto';
import { PatientsService } from '../../services/patients/patients.service';

@Controller('patients')
export class PatientsController {
    constructor (private patientService: PatientsService) {}

    @Get('get-patients')
    getPatients() {
        return this.patientService.getPatients();
    }

    @Get('get-patient-by-id/:id')
    getPatientById(
        @Param('id') patientId: string
    ) {
        return this.patientService.getPatientById(patientId);
    }

    @Post('create-patient')
    createPatient(@Body() createPatientDto: CreatePatientDto) {
        return this.patientService.createPatient(createPatientDto);
    }

    @Put('update-patient/:id')
    updatePatient(
        @Param('id') id: string,
        @Body() updatePatientDto: UpdatePatientDto
    ) {
        return this.patientService.updatePatient(id, updatePatientDto);
    }

    @Delete('delete-patient/:id')
    deletePatient(@Param('id') id: string) {
        return this.patientService.deletePatient(id);
    }
}
