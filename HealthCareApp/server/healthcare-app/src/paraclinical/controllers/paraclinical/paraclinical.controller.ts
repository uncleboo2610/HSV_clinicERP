import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import { ParaclinicalReportDto } from 'src/paraclinical/dtos/ParaclinicalReport.dto';
import { ParaclinicalService } from 'src/paraclinical/services/paraclinical/paraclinical.service';

@Controller('paraclinical')
export class ParaclinicalController {

    constructor(
        private paraclinicalService: ParaclinicalService
    ) {}

    @Get('get-paraclinical-reports')
    getParaclinicalReports() {
        return this.paraclinicalService.getParaclinicalReports();
    }

    @Post('create-paraclinical-report')
    createParaclinicalReport(
        @Body() paraclinicalReportDto: ParaclinicalReportDto
    ) {
        return this.paraclinicalService.createParaclinicalReport(
            paraclinicalReportDto, 
            paraclinicalReportDto.patientId,
            paraclinicalReportDto.staffId,
            paraclinicalReportDto.typeServiceId,
            paraclinicalReportDto.staffTicketId
        );
    }
}
