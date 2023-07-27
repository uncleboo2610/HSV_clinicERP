import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Entity } from "typeorm";
import { Staff } from "./staff.entity";

@Entity('department')
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    departmentName: string;

    @OneToMany(() => Staff, (staff) => staff.department, { nullable: false, onUpdate: 'CASCADE' }, )
    staff: Staff[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}