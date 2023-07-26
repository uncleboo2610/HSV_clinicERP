import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Entity } from "typeorm";
import { Doctor } from "./doctor.entity";

@Entity('department')
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    departmentName: string;

    @OneToMany(() => Doctor, (doctor) => doctor.department, { nullable: false })
    doctor: Doctor[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}