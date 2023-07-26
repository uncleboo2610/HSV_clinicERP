import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Entity } from "typeorm";
import { Department } from "./department.entity";

@Entity('receiving_card')
export class ReceivingCard {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    patientName: string;

    @ManyToOne(() => Department)
    department: Department;

    @CreateDateColumn()
    receivingDate: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}