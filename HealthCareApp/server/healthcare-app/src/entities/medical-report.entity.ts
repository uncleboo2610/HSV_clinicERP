import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { Patient } from "./patient.entity";
import { Staff } from "./staff.entity";

@Entity('medical_report')
export class MedicalReport {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    reExaminationDate: Date;

    @Column()
    diagnostic: string;

    @ManyToOne(() => Patient, (patient) => patient.medical_report)
    patient: Patient;

    @ManyToOne(() => Staff, (staff) => staff.medical_report)
    staff: Staff;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}