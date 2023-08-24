import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Drug } from "./drug.entity";

@Entity('medicine_storage')
export class MedicineStorage {
    @PrimaryGeneratedColumn()
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