import { OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from "@nestjs/websockets";
import { Server } from "socket.io";
import { MedicalReport } from "src/entities/medical-report.entity";
import { Patient } from "src/entities/patient.entity";
import { Prescription } from "src/entities/prescription.entity";
import { ReceivingCardDetail } from "src/entities/receiving-card-detail.entity";
import { StaffTicket } from "src/entities/staff-ticket.entity";
import { Repository } from "typeorm";

@WebSocketGateway(3001, {
    cors: {
        origin: '*',
    }
})
export class MyGateWay implements OnModuleInit {
    constructor(
        @InjectRepository(ReceivingCardDetail) private receivingCardDetailRepository: Repository<ReceivingCardDetail>,
        @InjectRepository(Patient) private receivingPatientRepository: Repository<Patient>,
        @InjectRepository(StaffTicket) private staffTicketRepository: Repository<StaffTicket>,
        @InjectRepository(Prescription) private prescriptionRepository: Repository<Prescription>,
        @InjectRepository(MedicalReport) private medicalReportRepository: Repository<MedicalReport>,
    ) {}
    
    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on('connection', (socket) => {})
    }

    @SubscribeMessage('newReceiving')
    async onNewReceiving(@MessageBody() body: any) {
        const data = await this.receivingCardDetailRepository.find({ relations: ['patient', 'receivingCard', 'department'] });
        this.server.emit('onReceiving', {
            content: data
        })
    }

    @SubscribeMessage('newPatient')
    async onNewPatient() {
        const data = await this.receivingPatientRepository.find();
        this.server.emit('onPatient', {
            content: data
        })
    }

    @SubscribeMessage('newStaffTicket')
    async onNewStaffTicket() {
        const data = await this.staffTicketRepository.find({ relations: ['patient'] });
        this.server.emit('onStaffTicket', {
            content: data
        })
    }

    @SubscribeMessage('newPrescriptionDetail')
    async onPrescriptionDetail(@MessageBody() body: number) {
        const data = await this.prescriptionRepository.findOne({ 
            where: {id: body},
            relations: ['prescriptionDetail.drug', 'patient', 'medicalReport']
        });
        this.server.emit('onPrescriptionDetail', {
            content: data
        })
    }

    @SubscribeMessage('newMedicalReportById')
    async onMedicalReportById(@MessageBody() body: string) {
        const data = await this.medicalReportRepository.findOneBy({id: body})
        this.server.emit('onMedicalReport', {
            content: data
        })
    }
}