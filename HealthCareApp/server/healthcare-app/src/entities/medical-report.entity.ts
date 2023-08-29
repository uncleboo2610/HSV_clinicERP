import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Patient } from "./patient.entity";
import { Staff } from "./staff.entity";
import { TypeSolution } from "./type-solution.entity";
import { ICD } from "./ICD.entity";

@Entity('medical_report')
export class MedicalReport {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    reExaminationDate: Date;

    @Column()
    diagnostic: string;

    @ManyToOne(() => ICD)
    diseaseIcd: ICD;

    @ManyToOne(() => Patient, (patient) => patient.medicalReport)
    patient: Patient;

    @ManyToOne(() => Staff, (staff) => staff.medicalReport)
    staff: Staff;

    @ManyToMany(() => TypeSolution)
    @JoinTable()
    typeSolution: TypeSolution[];

    @ManyToMany(() => ICD)
    @JoinTable()
    comorbidity: ICD[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}