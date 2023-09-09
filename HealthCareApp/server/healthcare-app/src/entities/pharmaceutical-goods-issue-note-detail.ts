import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Drug } from "./drug.entity";
import { PharmaceuticalGoodsReceiptNote } from "./pharmaceutical-goods-receipt-note";
import { PharmaceuticalGoodsIssueNote } from "./pharmaceutical-goods-issue-note";

@Entity('pharmaceutical_goods_issue_note-detail')
export class PharmaceuticalGoodsIssueNoteDetail {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => PharmaceuticalGoodsIssueNote, (note) => note.pharmaceuticalGoodsIssueNoteDetail)
    pharmaceuticalGoodsIssueNote: PharmaceuticalGoodsIssueNote;

    @ManyToOne(() => Drug, (note) => note.pharmaceuticalGoodsIssueNoteDetail)
    medicine: Drug;
    
    @Column()
    quantity: number;
}