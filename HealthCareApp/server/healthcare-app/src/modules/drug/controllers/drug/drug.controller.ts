import { Body, Controller, Get, Post } from '@nestjs/common';
import { DrugDto } from '../../dtos/Drug.dto';
import { DrugService } from '../../services/drug/drug.service';

@Controller('drug')
export class DrugController {

    constructor(
        private drugService: DrugService
    ) {}

    @Get('get-drugs')
    getDrugs() {
        return this.drugService.getDrugs();
    }

    @Get('get-type-drugs')
    getTypeDrugs() {
        return this.drugService.getTypeDrugs();
    }

    @Post('create-drug')
    createDrug(
        @Body() drugDto: DrugDto
    ) {
        return this.drugService.createDrug(drugDto, drugDto.typeDrugId);
    }
}
