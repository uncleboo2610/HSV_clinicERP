import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Drug } from "./drug.entity";

@Entity('medical_storage')
export class MedicalStorage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    medicalStorageName: string;

    @OneToMany(() => Drug, (drug) => drug.medicalStorage)
    drug: Drug[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}