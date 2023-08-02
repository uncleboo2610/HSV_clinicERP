import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, Headers } from '@nestjs/common';
import { StaffDto, StaffTicketDto } from 'src/staff/dtos/Staff.dto';
import { StaffService } from 'src/staff/services/staff/staff.service';
import { Request } from 'express';

@Controller('staff')
export class StaffController {

    constructor (private staffService: StaffService) {}

    @Get('get-staffs')
    getStaffs() {
        return this.staffService.getStaffs();
    }

    @Get('get-staff-tickets')
    getStaffTickets() {
        return this.staffService.getStaffTickets();
    }

    @Get('get-profile')
    getProfile(
        @Headers() headers
    ) {
        return this.staffService.getProfile(headers);
    }

    @Post('create-staff')
    createStaff(@Body() staffDto: StaffDto) {
        if(staffDto.password === staffDto.confirmPassword) {
            return this.staffService.createStaff(staffDto, staffDto.password, staffDto.departmentId);
        } else {
            throw new BadRequestException('Wrong password!');
        }
    }

    @Post('create-staff-ticket')
    createStaffTicket(@Body() staffTicketDto: StaffTicketDto) {
        return this.staffService.createStaffTicket(staffTicketDto, staffTicketDto.patientId);
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
