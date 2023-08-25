import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MedicalReport } from "./medical-report.entity";

@Entity('type_solution')
export class TypeSolution {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    solutionName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}