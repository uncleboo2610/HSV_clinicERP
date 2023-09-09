import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Drug } from "./drug.entity";
import { PharmaceuticalGoodsReceiptNote } from "./pharmaceutical-goods-receipt-note";

@Entity('pharmaceutical_goods_receipt_note-detail')
export class PharmaceuticalGoodsReceiptNoteDetail {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => PharmaceuticalGoodsReceiptNote, (note) => note.pharmaceuticalGoodsReceiptNoteDetail)
    pharmaceuticalGoodsReceiptNote: PharmaceuticalGoodsReceiptNote;

    @ManyToOne(() => Drug, (note) => note.pharmaceuticalGoodsReceiptNoteDetail)
    medicine: Drug;
    
    @Column()
    quantity: number;
}