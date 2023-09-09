import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PharmaceuticalGoodsIssueNoteDetail } from "./pharmaceutical-goods-issue-note-detail";

@Entity('pharmaceutical_goods_issue_note')
export class PharmaceuticalGoodsIssueNote {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToMany(() => PharmaceuticalGoodsIssueNoteDetail, (detail) => detail.pharmaceuticalGoodsIssueNote)
    pharmaceuticalGoodsIssueNoteDetail: PharmaceuticalGoodsIssueNoteDetail;
    
    @Column()
    exportInStock: string;

    @Column()
    location: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}