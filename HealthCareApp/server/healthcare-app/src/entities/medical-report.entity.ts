import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { Patient } from "./patient.entity";
import { Doctor } from "./doctor.entity";

@Entity('medical_report')
export class MedicalReport {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    checkUpDate: Date;

    @Column()
    diagnostic: string;

    @ManyToOne(() => Patient, (patient) => patient.medical_report)
    patient: Patient;

    @ManyToOne(() => Doctor, (doctor) => doctor.medical_report)
    doctor: Doctor;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}