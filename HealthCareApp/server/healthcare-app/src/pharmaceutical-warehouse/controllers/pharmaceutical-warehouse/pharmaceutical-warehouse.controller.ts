import { Body, Controller, Get, Post } from '@nestjs/common';
import { PharmaceuticalGoodsReceiptDto, PharmaceuticalWarehouseDto } from 'src/pharmaceutical-warehouse/dtos/pharmaceutical-warehouse.dto';
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
    createPharmaceuticalGoodsGoodsReceipt(
        @Body() pharmaceuticalGoodsReceipthouseDto: PharmaceuticalGoodsReceiptDto[]
    ) {
        return this.pharmaceuticalWarehouseService.createPharmaceuticalGoodsReceipt(pharmaceuticalGoodsReceipthouseDto);
    }
}
