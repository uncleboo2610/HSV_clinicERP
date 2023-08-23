import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Prescription } from "./prescription.entity";
import { Drug } from "./drug.entity";

@Entity('type_drug')
export class TypeDrug {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    typeDrugName: string;

    @OneToMany(() => Drug, (drug) => drug.typeDrug)
    drug: Drug[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}