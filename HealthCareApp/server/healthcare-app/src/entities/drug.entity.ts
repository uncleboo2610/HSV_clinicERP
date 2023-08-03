import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('drug')
export class Drug {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    drugName: string;
    
    @Column()
    price: string;

    @Column()
    unit: string;

    // @OneToOne(() => MedicalReport)
    // @JoinColumn()
    // // medicalReport: MedicalReport;
}