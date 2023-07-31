import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReceivingCardDto } from 'src/receiving-card/dtos/ReceivingCard.dto';
import { ReceivingCardDetailDto } from 'src/receiving-card/dtos/ReceivingCardDetail.dto';
import { ReceivingCardService } from 'src/receiving-card/services/receiving-card/receiving-card.service';

@Controller('receiving-card')
export class ReceivingCardController {

    constructor(private receivingCardService: ReceivingCardService) {}

    @Get('get-receiving-cards')
    getReceivingCard() {
        return this.receivingCardService.getReceivingCards();
    }

    @Get('get-receiving-card-details')
    getReceivingCardDetail() {
        return this.receivingCardService.getReceivingCardDetails();
    }

    @Post('create-receiving-card') 
    createReceivingCard(
        @Body() receivingCardDto: ReceivingCardDto
    ) {
        return this.receivingCardService.createReceivingCard(receivingCardDto.patientId, receivingCardDto);
    }

    @Post('create-receiving-card-detail') 
    createReceivingCardDetail(
        @Body() receivingCardDetailDto: ReceivingCardDetailDto
    ) {
        return this.receivingCardService.createReceivingCardDetail(receivingCardDetailDto.patientId, receivingCardDetailDto.receivingCardId, receivingCardDetailDto.departmentId);
    }

    @Put('update-receiving-card/:id')
    updateReceivingCard(
        @Param('id') id: string,
        @Body() receivingCardDto: ReceivingCardDto
    ) {
        return this.receivingCardService.updateReceivingCard(id, receivingCardDto);
    }

    @Delete('delete-receiving-card/:id')
    deleteReceivingCard(@Param('id') id: string) {
        return this.receivingCardService.deleteReceivingCard(id);
    }
}
