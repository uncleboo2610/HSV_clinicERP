import { Controller, Get, Param } from '@nestjs/common';
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

    @Get('get-icd-by-id/:alphabetId')
    getIcdById(
        @Param('startId') alphabetId: string,
    ) {
        return this.icdService.getIcdById(alphabetId);
    }
}
