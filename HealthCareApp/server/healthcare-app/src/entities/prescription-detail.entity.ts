import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StaffTicket } from "./staff-ticket.entity";
import { MedicalReport } from "./medical-report.entity";
import { Drug } from "./drug.entity";

@Entity('prescription_detail')
export class PrescriptionDetail {
    @PrimaryGeneratedColumn()
    id: number;

    // @OneToMany(() => Drug)
    // @JoinColumn()
    // drug: Drug;

    @Column()
    note: string;

    // @OneToOne(() => MedicalReport)
    // @JoinColumn()
    // // medicalReport: MedicalReport;
}