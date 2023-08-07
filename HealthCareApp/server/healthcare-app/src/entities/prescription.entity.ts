import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StaffTicket } from "./staff-ticket.entity";
import { MedicalReport } from "./medical-report.entity";
import { PrescriptionDetail } from "./prescription-detail.entity";
import { Patient } from "./patient.entity";

@Entity('prescription')
export class Prescription {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => PrescriptionDetail, (prescriptionDetail) => prescriptionDetail.prescription)
    prescriptionDetail: PrescriptionDetail[];

    @ManyToOne(() => Patient, (patient) => patient.prescription)
    patient: Patient;

    @ManyToOne(() => MedicalReport)
    medicalReport: MedicalReport;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}