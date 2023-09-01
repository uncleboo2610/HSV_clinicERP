import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { PharmaceuticalGoodsIssueDto, PharmaceuticalGoodsReceiptDto, PharmaceuticalWarehouseDto } from 'src/pharmaceutical-warehouse/dtos/pharmaceutical-warehouse.dto';
import { PharmaceuticalWarehouseService } from 'src/pharmaceutical-warehouse/services/pharmaceutical-warehouse/pharmaceutical-warehouse.service';

@Controller('pharmaceutical-warehouse')
export class PharmaceuticalWarehouseController {

    constructor(
        private pharmaceuticalWarehouseService: PharmaceuticalWarehouseService
    ) {}

    @Get('get-pharmaceutical-warehouses')
    getPharmaceuticalWarehouses(
    ) {
        return this.pharmaceuticalWarehouseService.getPharmaceuticalWarehouses()
    }

    @Post('create-pharmaceutical-goods-receipt')
    createPharmaceuticalGoodsReceipt(
        @Body() pharmaceuticalGoodsReceiptDto: PharmaceuticalGoodsReceiptDto[]
    ) {
        return this.pharmaceuticalWarehouseService.createPharmaceuticalGoodsReceipt(pharmaceuticalGoodsReceiptDto);
    }

    @Put('create-pharmaceutical-goods-issue')
    updatePharmaceuticalGoodsIssue(
        @Body() pharmaceuticalGoodsIssueDto: PharmaceuticalGoodsIssueDto[]
    ) {
        return this.pharmaceuticalWarehouseService.updatePharmaceuticalGoodsIssue(pharmaceuticalGoodsIssueDto);
    }
}
