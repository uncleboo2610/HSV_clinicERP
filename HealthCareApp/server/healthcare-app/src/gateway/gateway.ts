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
        @InjectRepository(Patient) private patientRepository: Repository<Patient>,
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
        const data = await this.patientRepository.find();
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


    //except other users
    @SubscribeMessage('newPrescriptionDetail')
    async onPrescriptionDetail(@MessageBody() body: any) {
        const data = await this.prescriptionRepository.findOne({ 
            where: {id: body.data},
            relations: ['prescriptionDetail.drug', 'patient', 'medicalReport']
        });
        this.server.to(body.to).emit('onPrescriptionDetail', {
            content: data
        })
    }

    @SubscribeMessage('newHealthRecord')
    async onHealthRecord(@MessageBody() body: any) {
        const data = await this.patientRepository.findOne({ 
            where: {id: body.data},
            relations: ['prescription.prescriptionDetail', 'prescription.medicalReport.staff.department', 'medicalReport']
        });
        this.server.to(body.to).emit('onHealthRecord', {
            content: data
        })
    }

    @SubscribeMessage('checkParaclinicalRecord')
    async onParaclinicalRecord(@MessageBody() body: any) {
        const data = await this.patientRepository.findOne({ 
            where: {id: body.data},
            relations: ['medicalReport', 'paraclinicalReport']
        });
        this.server.to(body.to).emit('onParaclinicalRecord', {
            content: data
        })
    }

    @SubscribeMessage('checkHealthRecordDetail')
    async onHealthRecordDetail(@MessageBody() body: any) {
        const data = await this.prescriptionRepository.findOne({
            where: {id: body.data},
            relations: ['prescriptionDetail.drug'],
        })
        this.server.to(body.to).emit('onCheckHealthRecordDetail', {
            content: data
        })
    }

    @SubscribeMessage('newMedicalReport')
    async onMedicalReportById(@MessageBody() body: any) {
        const data = await this.medicalReportRepository.find({ relations: ['patient'] })
        this.server.to(body.to).emit('onMedicalReport', {
            content: data
        })
    }

    @SubscribeMessage('newStaffTicketDetail')
    async onNewStaffTicketDetail(@MessageBody() body: any) {
        const data = await this.staffTicketRepository.findOne({
            where: { id: body.data },
            relations: ['patient', 'staffTicketDetail.typeService']
        });
        this.server.to(body.to).emit('onStaffTicketDetail', {
            content: data
        })
    }
}