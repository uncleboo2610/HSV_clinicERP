import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StaffTicket } from "./staff-ticket.entity";
import { MedicalReport } from "./medical-report.entity";

@Entity('prescription')
export class Prescription {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => MedicalReport)
    @JoinColumn()
    medicalReport: MedicalReport;

    @Column()
    note: string;

    // @OneToOne(() => MedicalReport)
    // @JoinColumn()
    // // medicalReport: MedicalReport;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}