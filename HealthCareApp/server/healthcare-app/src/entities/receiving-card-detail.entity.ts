import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Entity, JoinColumn, OneToOne } from "typeorm";
import { Department } from "./department.entity";
import { Patient } from "./patient.entity";
import { ReceivingCard } from "./receiving-card.entity";

@Entity('receiving_card_detail')
export class ReceivingCardDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Department)
    department: Department;

    @ManyToOne(() => Patient)
    patient: Patient;

    @ManyToOne(() => ReceivingCard, (receivingCard) => receivingCard.receivingCardDetail)
    receivingCard: ReceivingCard;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}