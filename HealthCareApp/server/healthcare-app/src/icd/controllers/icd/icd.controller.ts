import { Controller, Get, Param, Query } from '@nestjs/common';
import { IcdService } from 'src/icd/services/icd/icd.service';

@Controller('icd')
export class IcdController {

    constructor(
        private icdService: IcdService
    ) {}

    @Get('get-icd')
    getIcd() {
        return this.icdService.getIcd();
    }

    @Get('get-icd-by-id/:IcdId')
    getIcdById(
        @Param('IcdId') IcdId: string,
        @Query('limit') limit: number = 1000,
        @Query('page') page: number = 1,
    ) {
        return this.icdService.getIcdById(IcdId);
    }
}
