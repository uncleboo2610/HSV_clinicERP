import { OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from "@nestjs/websockets";
import { Server } from "socket.io";
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
    ) {}
    
    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on('connection', (socket) => {})
    }

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any) {
        console.log(body)
        this.server.emit('onMessage', {
            content: body
        });
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
        const rawQueryString = `select p.id, pd.note, drug.drugName, pd.drugId, pd.morningDose, pd.afternoonDose, pd.eveningDose from prescription p
                                inner join (select note, prescriptionId, drugId, morningDose, afternoonDose, eveningDose from prescription_detail) pd on pd.prescriptionId = p.id
                                inner join (select id, drugName from drug) drug on pd.drugId = drug.id
                                where p.id = ${body}`;
        
        const data = await this.prescriptionRepository.query(rawQueryString);
        this.server.emit('onPrescriptionDetail', {
            content: data
        })
    }
}