import { Body, Controller, Get, Post } from '@nestjs/common';
import { DrugDto } from 'src/drug/dtos/Drug.dto';
import { DrugService } from 'src/drug/services/drug/drug.service';

@Controller('drug')
export class DrugController {

    constructor(
        private drugService: DrugService
    ) {}

    @Get('get-drugs')
    getDrugs() {
        return this.drugService.getDrugs();
    }

    @Post('create-drug')
    createDrug(
        @Body() drugDto: DrugDto
    ) {
        return this.drugService.createDrug(drugDto, 1, drugDto.typeDrugId);
    }
}
