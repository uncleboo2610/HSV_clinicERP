import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Patient } from "./patient.entity";
import { StaffTicket } from "./staff-ticket.entity";
import { TypeService } from "./type-service.entity";

@Entity('staff_ticket_detail')
export class StaffTicketDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => StaffTicket, (staffTicket) => staffTicket.staffTicketDetail)
    staffTicket: StaffTicket;

    @ManyToOne(() => TypeService)
    typeService: TypeService;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}