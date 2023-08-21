import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { MedicalReport } from "./medical-report.entity";
import { Prescription } from "./prescription.entity";
import { ParaclinicalReport } from "./paraclinical-report.entity";

@Entity('patient')
export class Patient {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    dob: Date;

    @Column()
    idCard: number;

    @Column()
    address: string;

    @Column()
    gender: string;

    @Column()
    phone: number;

    @Column()
    pob: string;

    @Column()
    job: string;

    @OneToMany(() => MedicalReport, (mR) => mR.patient)
    medicalReport: MedicalReport[];

    @OneToMany(() => Prescription, (prescription) => prescription.patient)
    prescription: Prescription[];

    @OneToMany(() => ParaclinicalReport, (paraclinicalReport) => paraclinicalReport.patient)
    paraclinicalReport: ParaclinicalReport[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}