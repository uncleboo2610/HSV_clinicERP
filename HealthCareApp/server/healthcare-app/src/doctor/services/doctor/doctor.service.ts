import { BadRequestException, Body, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorDto } from 'src/doctor/dtos/Doctor.dto';
import { DoctorParams } from 'src/doctor/utils/types';
import { Department } from 'src/entities/department.entity';
import { Doctor } from 'src/entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {

    constructor(
        @InjectRepository(Doctor) private doctorRepository: Repository<Doctor>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>
    ) {}

    getDoctors() {
        return this.doctorRepository.find({ relations: ['department'] });
    }

    async createDoctor(doctorDetails: DoctorParams, departmentId: number) {
        const department = await this.departmentRepository.findOneBy({ id: departmentId });

        if(!department) {
            throw new BadRequestException('This department does not exist !!!');
        };

        const newDoctor = this.doctorRepository.create({
            ...doctorDetails,
            department,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return this.doctorRepository.save(newDoctor);
    }

    async updateDoctor(
        id: string,
        doctorDetails: DoctorParams,
        departmentId: number
    ) {
        const department = await this.departmentRepository.findOneBy({ id: departmentId });

        if(!department) {
            throw new BadRequestException('This department does not exist !!!');
        };

        return this.doctorRepository.update({ id }, { ...doctorDetails, department, updatedAt: new Date() });
    }

    deleteDoctor(id: string) {
        return this.doctorRepository.delete({ id });
    }
}
