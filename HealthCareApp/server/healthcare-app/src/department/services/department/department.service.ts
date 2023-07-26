import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentDto } from 'src/department/dtos/Department.dto';
import { Department } from 'src/entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {

    constructor(
        @InjectRepository(Department) private departmentRepository: Repository<Department>
    ) {}

    getDepartments() {
        return this.departmentRepository.find({ relations: ['doctor'] });
    }

    createDepartment(DepartmentDetails: DepartmentDto) {
        const newDept = this.departmentRepository.create({
            ...DepartmentDetails,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return this.departmentRepository.save(newDept);
    }

    updateDepartment(
        id: number, 
        DepartmentDetails: DepartmentDto
    ) {
        return this.departmentRepository.update({ id }, { ...DepartmentDetails, updatedAt: new Date() });
    }

    deleteDepartment(id: number) {
        return this.departmentRepository.delete({ id });
    }
}
