import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Patient } from "./patient.entity";
import { StaffTicketDetail } from "./staff-ticket-detail.entity";

@Entity('staff_ticket')
export class StaffTicket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    note: string;

    @ManyToOne(() => Patient)
    patient: Patient;

    @OneToMany(() => StaffTicketDetail, (staffTicketDetail) => staffTicketDetail.staffTicket)
    staffTicketDetail: StaffTicketDetail;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}