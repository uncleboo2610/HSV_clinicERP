import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { Staff } from 'src/entities/staff.entity';
import { StaffParams } from 'src/staff/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {

    constructor(
        @InjectRepository(Staff) private staffRepository: Repository<Staff>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>
    ) {}

    getStaffs() {
        return this.staffRepository.find({ relations: ['department'] });
    }

    async createStaff(staffDetails: StaffParams, departmentId: number) {
        const department = await this.departmentRepository.findOneBy({ id: departmentId });

        if(!department) {
            throw new BadRequestException('This department does not exist !!!');
        };

        const newStaff = this.staffRepository.create({
            ...staffDetails,
            department,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return this.staffRepository.save(newStaff);
    }

    async updateStaff(
        id: string,
        staffDetails: StaffParams,
        departmentId: number
    ) {
        const department = await this.departmentRepository.findOneBy({ id: departmentId });

        return this.staffRepository.update({ id }, { ...staffDetails, updatedAt: new Date() });
    }

    deleteStaff(id: string) {
        return this.staffRepository.delete({ id });
    }
}
