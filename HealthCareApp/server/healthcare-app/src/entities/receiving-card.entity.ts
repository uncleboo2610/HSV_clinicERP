import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Entity, JoinColumn, OneToOne } from "typeorm";
import { Department } from "./department.entity";
import { Patient } from "./patient.entity";

@Entity('receiving_card')
export class ReceivingCard {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    patientName: string;

    @ManyToOne(() => Department)
    department: Department;

    @OneToOne(() => Patient)
    @JoinColumn()
    patient: Patient;

    @CreateDateColumn()
    receivingDate: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}