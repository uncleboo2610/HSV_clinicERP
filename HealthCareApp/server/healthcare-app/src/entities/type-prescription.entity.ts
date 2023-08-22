import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Prescription } from "./prescription.entity";

@Entity('type_prescription')
export class TypePrescription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    typePrescriptionName: string;

    @OneToMany(() => Prescription, (prescription) => prescription.typePrescription)
    prescription: Prescription[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}