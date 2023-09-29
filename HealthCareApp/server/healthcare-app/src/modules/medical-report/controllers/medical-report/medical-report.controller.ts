import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MedicalReportDto } from '../../dtos/MedicalReport.dto';
import { MedicalReportService } from '../../services/medical-report/medical-report.service';

@Controller('medical-report')
export class MedicalReportController {

    constructor(private medicalReportService: MedicalReportService) {}

    @Get('get-medical-reports')
    getMedicalReports() {
        return this.medicalReportService.getMedicalReports();
    }

    @Post('create-medical-report')
    createMedicalReport(
        @Body() medicalReportDto: MedicalReportDto
    ) {
        return this.medicalReportService.createMedicalReport(
            medicalReportDto.patientId, 
            medicalReportDto, 
            medicalReportDto.staffId, 
            medicalReportDto.typeSolutionId,
            medicalReportDto.diseaseIcd,
            medicalReportDto.comorbidityId
        );
    }

    @Put('update-medical-report/:id')
    updateMedicalReport(
        @Param('id') id: string,
        @Body() medicalReportDto: MedicalReportDto
    ) {
        return this.medicalReportService.updateMedicalReport(id, medicalReportDto);
    }

    @Delete('delete-medical-report/:id')
    deleteMedicalReport(
        @Param('id') id: string
    ) {
        return this.medicalReportService.deleteMedicalReport(id);
    }
}
