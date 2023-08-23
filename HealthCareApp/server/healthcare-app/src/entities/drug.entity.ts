import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PrescriptionDetail } from "./prescription-detail.entity";
import { MedicalStorage } from "./medical-storage.entity";
import { TypeDrug } from "./type-drug.entity";

@Entity('drug')
export class Drug {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    drugName: string;
    
    @Column()
    price: number;

    @Column()
    unit: string;

    @OneToMany(() => PrescriptionDetail, (prescriptionDetail) => prescriptionDetail.drug)
    prescriptionDetail: PrescriptionDetail[];

    @ManyToOne(() => MedicalStorage, (medicalStorage) => medicalStorage.drug)
    medicalStorage: MedicalStorage;

    @ManyToOne(() => TypeDrug, (typeDrug) => typeDrug.drug)
    typeDrug: TypeDrug;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}