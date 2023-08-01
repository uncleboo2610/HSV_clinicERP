import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Patient } from "./patient.entity";

@Entity('staff_ticket')
export class StaffTicket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    note: string;

    @ManyToOne(() => Patient)
    patient: Patient;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}