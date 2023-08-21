import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParaclinicalReport } from 'src/entities/paraclinical-report.entity';
import { Patient } from 'src/entities/patient.entity';
import { StaffTicket } from 'src/entities/staff-ticket.entity';
import { Staff } from 'src/entities/staff.entity';
import { TypeService } from 'src/entities/type-service.entity';
import { ParaclinicalReportParams } from 'src/paraclinical/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ParaclinicalService {

    constructor(
        @InjectRepository(ParaclinicalReport) private paraclinicalReportRepository: Repository<ParaclinicalReport>,
        @InjectRepository(StaffTicket) private staffTicketRepository: Repository<StaffTicket>,
        @InjectRepository(Staff) private staffRepository: Repository<Staff>,
        @InjectRepository(TypeService) private typeServiceRepository: Repository<TypeService>,
        @InjectRepository(Patient) private patientRepository: Repository<Patient>
    ) {}

    getParaclinicalReports() {
        return this.paraclinicalReportRepository.find({ relations: ['staffTicket.patient', 'staff', 'typeService'] });
    }

    async createParaclinicalReport(
        paraclinicalReport: ParaclinicalReportParams, 
        patientId: string,
        staffId: string, 
        typeServiceId: number,
        staffTicketId: number
    ) {
        const patient = await this.patientRepository.findOneBy({ id: patientId });
        const staff = await this.staffRepository.findOneBy({ id: staffId });
        const typeService = await this.typeServiceRepository.findOneBy({ id: typeServiceId });
        const staffTicket = await this.staffTicketRepository.findOneBy({ id: staffTicketId });

        if(!staffTicket) {
            throw new BadRequestException('This staffs ticket doesnt exit !!! Error!!!');
        }

        const newParaclinicalReport = this.paraclinicalReportRepository.create({
            ...paraclinicalReport,
            patient,
            staff,
            typeService,
            staffTicket,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return this.paraclinicalReportRepository.save(newParaclinicalReport);
    }
}
