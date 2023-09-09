import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PrescriptionDetail } from "./prescription-detail.entity";
import { TypeDrug } from "./type-drug.entity";
import { PharmaceuticalGoodsReceiptNoteDetail } from "./pharmaceutical-goods-receipt-note-detail";
import { PharmaceuticalGoodsIssueNoteDetail } from "./pharmaceutical-goods-issue-note-detail";

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

    @ManyToOne(() => TypeDrug, (typeDrug) => typeDrug.drug)
    typeDrug: TypeDrug;

    @OneToMany(() => PharmaceuticalGoodsReceiptNoteDetail, (detail) => detail.medicine)
    pharmaceuticalGoodsReceiptNoteDetail: PharmaceuticalGoodsReceiptNoteDetail;

    @OneToMany(() => PharmaceuticalGoodsIssueNoteDetail, (detail) => detail.medicine)
    pharmaceuticalGoodsIssueNoteDetail: PharmaceuticalGoodsIssueNoteDetail;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}