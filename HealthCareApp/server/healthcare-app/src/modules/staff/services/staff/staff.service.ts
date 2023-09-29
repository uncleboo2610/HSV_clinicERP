import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { Patient } from 'src/entities/patient.entity';
import { StaffTicket } from 'src/entities/staff-ticket.entity';
import { Staff } from 'src/entities/staff.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { StaffTicketDetail } from 'src/entities/staff-ticket-detail.entity';
import { TypeService } from 'src/entities/type-service.entity';
import { StaffParams, StaffTicketParams } from '../../utils/types';

@Injectable()
export class StaffService {

    constructor(
        @InjectRepository(Staff) private staffRepository: Repository<Staff>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
        @InjectRepository(StaffTicket) private staffTicketRepository: Repository<StaffTicket>,
        @InjectRepository(StaffTicketDetail) private staffTicketDetailRepository: Repository<StaffTicketDetail>,
        @InjectRepository(TypeService) private typeServiceRepository: Repository<TypeService>,
        @InjectRepository(Patient) private patientRepository: Repository<Patient>,
        private readonly jwtService: JwtService,
    ) {}

    getStaffs() {
        return this.staffRepository.find({ relations: ['department'] });
    }

    getStaffTickets() {
        return this.staffTicketRepository.find({ relations: ['patient', 'staffTicketDetail.typeService'] });
    }

    async getProfile(header: any) {
        const token = header['token'];
        const decodedJwtAccessToken = this.jwtService.verify(token);
        const profile = await this.staffRepository.findOneBy({ id: decodedJwtAccessToken?.id })

        return profile;
    }

    async createStaff(staffDetails: StaffParams, password: string, departmentId: number) {
        const department = await this.departmentRepository.findOneBy({ id: departmentId });

        if(!department) {
            throw new BadRequestException('This department does not exist !!!');
        };

        staffDetails.password = await bcrypt.hash(password, 12);

        const newStaff = this.staffRepository.create({
            ...staffDetails,
            department,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return this.staffRepository.save(newStaff);
    }

    async createStaffTicket(staffTicketParams: StaffTicketParams, patientId: string) {
        const patient = await this.patientRepository.findOneBy({ id: patientId });
        const newStaffTicket = this.staffTicketRepository.create({
            ...staffTicketParams,
            patient,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        return this.staffTicketRepository.save(newStaffTicket);
    }

    async createStaffTicketDetail(typeServiceId: number[], staffTicketId: number) {
        const staffTicket = await this.staffTicketRepository.findOneBy({ id: staffTicketId });
        typeServiceId.map(async (id) => {
            const typeService = await this.typeServiceRepository.findOneBy({ id: id });
    
            const newStaffTicketDetail = this.staffTicketDetailRepository.create({
                staffTicket,
                typeService,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            
            return this.staffTicketDetailRepository.save(newStaffTicketDetail);
        })
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
