import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StaffDto } from 'src/staff/dtos/Staff.dto';
import { StaffService } from 'src/staff/services/staff/staff.service';

@Controller('staff')
export class StaffController {

    constructor (private staffService: StaffService) {}

    @Get('get-staffs')
    getStaffs() {
        return this.staffService.getStaffs();
    }

    @Post('create-staff')
    createStaff(@Body() staffDto: StaffDto) {
        return this.staffService.createStaff(staffDto, staffDto.departmentId);
    }

    @Put('update-staff/:id')
    updateStaff(
        @Param('id') id: string,
        @Body() staffDto: StaffDto
    ) {
        return this.staffService.updateStaff(id, staffDto, staffDto.departmentId);
    }

    @Delete('delete-staff/:id') 
    deleteStaff(@Param('id') id: string) {
        return this.staffService.deleteStaff(id);
    } 
}