import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TypeServiceDto } from '../../dtos/TypeService.dto';
import { TypeServiceService } from '../../services/type-service/type-service.service';

@Controller('type-service')
export class TypeServiceController {

    constructor(private typeServiceService: TypeServiceService) {}

    @Get('get-type-services')
    getTypeServices() {
        return this.typeServiceService.getTypeServices();
    }

    @Post('create-type-service')
    createTypeService(@Body() typeServiceDto: TypeServiceDto) {
        return this.typeServiceService.createTypeService(typeServiceDto);
    }

    @Delete('delete-type-service/:id')
    deleteTypeService(
        @Param('id', ParseIntPipe) id: number
    ) {
        this.typeServiceService.deleteTypeService(id)
    }
}
