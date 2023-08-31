import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Drug } from "./drug.entity";

@Entity('pharmaceutical_warehouse')
export class PharmaceuticalWarehouse {
    @PrimaryColumn()
    id: number;
    
    @OneToOne(() => Drug)
    @JoinColumn()
    drug: Drug;
    
    @Column()
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}