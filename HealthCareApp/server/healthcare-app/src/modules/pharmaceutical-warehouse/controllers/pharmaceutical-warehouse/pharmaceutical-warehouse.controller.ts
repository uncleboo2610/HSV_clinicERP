import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { PharmaceuticalGoodsReceiptDto, PharmaceuticalGoodsReceiptNoteDto, PharmaceuticalGoodsIssueNoteDto, PharmaceuticalGoodsIssueDto } from '../../dtos/pharmaceutical-warehouse.dto';
import { PharmaceuticalWarehouseService } from '../../services/pharmaceutical-warehouse/pharmaceutical-warehouse.service';
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

    @Get('get-pharmaceutical-goods-receipt-note')
    getPharmaceuticalGoodsReceiptNote(
    ) {
        return this.pharmaceuticalWarehouseService.getPharmaceuticalGoodsReceiptNote()
    }

    @Get('get-pharmaceutical-goods-issue-note')
    getPharmaceuticalGoodsIssueNote(
    ) {
        return this.pharmaceuticalWarehouseService.getPharmaceuticalGoodsIssueNote()
    }

    @Post('create-pharmaceutical-goods-receipt')
    createPharmaceuticalGoodsReceipt(
        @Body() pharmaceuticalGoodsReceiptDto: PharmaceuticalGoodsReceiptDto
    ) {
        return this.pharmaceuticalWarehouseService.createPharmaceuticalGoodsReceipt(
            pharmaceuticalGoodsReceiptDto.detail, 
            pharmaceuticalGoodsReceiptDto.pharmaceuticalGoodsReceiptNoteId
        );
    }

    @Post('create-pharmaceutical-goods-receipt-note')
    createPharmaceuticalGoodsReceiptNote(
        @Body() pharmaceuticalGoodsReceiptNoteDto: PharmaceuticalGoodsReceiptNoteDto
    ) {
        return this.pharmaceuticalWarehouseService.createPharmaceuticalGoodsReceiptNote(pharmaceuticalGoodsReceiptNoteDto);
    }

    @Post('create-pharmaceutical-goods-issue-note')
    createPharmaceuticalGoodsIssueNote(
        @Body() pharmaceuticalGoodsIssueNoteDto: PharmaceuticalGoodsIssueNoteDto
    ) {
        return this.pharmaceuticalWarehouseService.createPharmaceuticalGoodsIssueNote(pharmaceuticalGoodsIssueNoteDto);
    }

    @Put('create-pharmaceutical-goods-issue')
    updatePharmaceuticalGoodsIssue(
        @Body() pharmaceuticalGoodsIssueDto: PharmaceuticalGoodsIssueDto
    ) {
        return this.pharmaceuticalWarehouseService.updatePharmaceuticalGoodsIssue(
            pharmaceuticalGoodsIssueDto.detail, 
            pharmaceuticalGoodsIssueDto.pharmaceuticalGoodsIssueNoteId
        );
    }
}
