import { Body, Controller, Get, Post } from '@nestjs/common';
import { ImaginingDiagnosticService } from '../../services/imagining-diagnostic/imagining-diagnostic.service';
import { ImaginingDiagnosticDto } from '../../dtos/ImaginingDiagnostic';

@Controller('imagining-diagnostic')
export class ImaginingDiagnosticController {
    
    constructor(
        private imaginingDiagnosticService: ImaginingDiagnosticService
    ) {}

    @Get('get-imagining-diagnostic-images')
    getImaginingDiagnostic() {
        return this.imaginingDiagnosticService.getImaginingDiagnostic();
    }

    @Post('create-imagining-diagnostic-image')
    createImaginingDiagnostic(
        @Body() imaginingDiagnosticDto: ImaginingDiagnosticDto
    ) {
        return this.imaginingDiagnosticService.createImaginingDiagnostic(imaginingDiagnosticDto.paraclinicalReportId, imaginingDiagnosticDto.imageUrl);
    }
}
