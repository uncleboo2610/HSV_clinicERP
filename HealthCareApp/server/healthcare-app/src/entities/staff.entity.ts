import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm"
import { MedicalReport } from "./medical-report.entity";
import { Department } from "./department.entity";

@Entity('staff')
export class Staff {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

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
    role: string;

    @Column()
    position: string;

    @OneToMany(() => MedicalReport, (mR) => mR.staff)
    medicalReport: MedicalReport[];

    @ManyToOne(() => Department, (dept) => dept.staff)
    department: Department;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}