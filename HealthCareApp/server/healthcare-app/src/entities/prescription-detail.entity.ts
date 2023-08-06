import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StaffTicket } from "./staff-ticket.entity";
import { MedicalReport } from "./medical-report.entity";
import { Drug } from "./drug.entity";
import { Prescription } from "./prescription.entity";

@Entity('prescription_detail')
export class PrescriptionDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    morningDose: number;

    @Column()
    afternoonDose: number;

    @Column()
    eveningDose: number;

    @Column()
    quantity: number;

    @Column()
    note: string;

    @ManyToOne(() => Prescription, (prescription) => prescription.prescriptionDetail)
    prescription: Prescription;

    @ManyToOne(() => Drug, (drug) => drug.prescriptionDetail)
    drug: Drug;
}