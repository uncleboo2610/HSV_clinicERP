import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { MedicalReport } from "./medical-report.entity";
import { Prescription } from "./prescription.entity";

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
    medical_report: MedicalReport[];

    @OneToMany(() => Prescription, (prescription) => prescription.patient)
    prescription: Prescription[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}