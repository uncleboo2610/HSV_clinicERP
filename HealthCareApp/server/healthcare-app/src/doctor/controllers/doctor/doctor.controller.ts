import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DoctorDto } from 'src/doctor/dtos/Doctor.dto';
import { DoctorService } from 'src/doctor/services/doctor/doctor.service';

@Controller('doctor')
export class DoctorController {

    constructor (private doctorService: DoctorService) {}

    @Get('get-doctors')
    getDoctors() {
        return this.doctorService.getDoctors();
    }

    @Post('create-doctor')
    createDoctor(@Body() doctorDto: DoctorDto) {
        return this.doctorService.createDoctor(doctorDto, doctorDto.departmentId);
    }

    @Put('update-doctor/:id')
    updateDoctor(
        @Param('id') id: string,
        @Body() doctorDto: DoctorDto
    ) {
        return this.doctorService.updateDoctor(id, doctorDto, doctorDto.departmentId);
    }

    @Delete('delete-doctor/:id') 
    deleteDoctor(@Param('id') id: string) {
        return this.doctorService.deleteDoctor(id);
    } 
}
