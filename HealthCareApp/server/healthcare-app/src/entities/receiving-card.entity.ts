import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Entity, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { Department } from "./department.entity";
import { Patient } from "./patient.entity";
import { ReceivingCardDetail } from "./receiving-card-detail.entity";

@Entity('receiving_card')
export class ReceivingCard {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    patientName: string;

    @OneToMany(() => ReceivingCardDetail, (receivingCarDetail) => receivingCarDetail.receivingCard)
    receivingCardDetail: ReceivingCardDetail[];

    @ManyToOne(() => Patient)
    patient: Patient;

    @CreateDateColumn()
    receivingDate: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}