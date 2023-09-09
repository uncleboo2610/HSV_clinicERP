import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Drug } from "./drug.entity";
import { PharmaceuticalGoodsReceiptNoteDetail } from "./pharmaceutical-goods-receipt-note-detail";

@Entity('pharmaceutical_goods_receipt_note')
export class PharmaceuticalGoodsReceiptNote {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToMany(() => PharmaceuticalGoodsReceiptNoteDetail, (detail) => detail.pharmaceuticalGoodsReceiptNote)
    pharmaceuticalGoodsReceiptNoteDetail: PharmaceuticalGoodsReceiptNoteDetail;
    
    @Column()
    inputInStock: string;

    @Column()
    location: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}