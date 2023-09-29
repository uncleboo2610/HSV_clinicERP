import { Controller, Get, Param, Query } from '@nestjs/common';
import { IcdService } from '../../services/icd/icd.service';

@Controller('icd')
export class IcdController {

    constructor(
        private icdService: IcdService
    ) {}

    @Get('get-icd')
    getIcd() {
        return this.icdService.getIcd();
    }

    @Get('get-icd-by-id/:groupId')
    getIcdById(
        @Param('groupId') groupId: string,
    ) {
        return this.icdService.getIcdById(groupId);
    }
}
