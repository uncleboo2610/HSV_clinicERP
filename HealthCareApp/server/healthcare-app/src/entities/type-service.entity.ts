import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('type_service')
export class TypeService {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serviceName: string;

    @Column()
    servicePrice: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}