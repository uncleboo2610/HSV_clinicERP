import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DepartmentDto } from '../../dtos/Department.dto';
import { DepartmentService } from '../../services/department/department.service';

@Controller('department')
export class DepartmentController {

    constructor(private departmentService: DepartmentService) {}

    @Get('get-departments')
    getDepartments() {
        return this.departmentService.getDepartments();
    }

    @Post('create-department') 
    createDepartment(
        @Body() departmentDto: DepartmentDto
    ) {
        return this.departmentService.createDepartment(departmentDto);
    }

    @Put('update-department/:id') 
    updateDeparment(
        @Param('id', ParseIntPipe) id: number,
        @Body() departmentDto: DepartmentDto,
    ) {
        return this.departmentService.updateDepartment(id, departmentDto);
    }

    @Delete('delete-department/:id')
    deleteDepartment(@Param('id', ParseIntPipe) id: number,) {
        return this.departmentService.deleteDepartment(id);
    }
}
