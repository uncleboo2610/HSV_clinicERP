import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm"
import { MedicalReport } from "./medical-report.entity";
import { Department } from "./department.entity";

@Entity('doctor')
export class Doctor {
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

    @OneToMany(() => MedicalReport, (mR) => mR.doctor)
    medical_report: MedicalReport[];

    @ManyToOne(() => Department, (dept) => dept.doctor)
    department: Department;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}