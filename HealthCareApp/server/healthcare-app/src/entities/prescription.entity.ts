import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StaffTicket } from "./staff-ticket.entity";
import { MedicalReport } from "./medical-report.entity";
import { PrescriptionDetail } from "./prescription-detail.entity";

@Entity('prescription')
export class Prescription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    note: string;

    @OneToMany(() => PrescriptionDetail, (prescriptionDetail) => prescriptionDetail.prescription)
    prescriptionDetail: PrescriptionDetail[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}