import { OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Department } from "src/entities/department.entity";
import { Patient } from "src/entities/patient.entity";
import { ReceivingCard } from "src/entities/receiving-card.entity";
import { Repository } from "typeorm";

@WebSocketGateway(3001, {
    cors: {
        origin: '*',
    }
})
export class MyGateWay implements OnModuleInit {
    constructor(
        @InjectRepository(ReceivingCard) private receivingCardRepository: Repository<ReceivingCard>,
        @InjectRepository(Department) private departmentRepository: Repository<Department>,
        @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    ) {}
    
    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Connected');
        })
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
        const data = await this.receivingCardRepository.find({ relations: ['patient', 'department'] });
        this.server.emit('onReceiving', {
            content: data
        })
    }
}