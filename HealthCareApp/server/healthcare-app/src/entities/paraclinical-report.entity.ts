import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Staff } from "./staff.entity";
import { TypeService } from "./type-service.entity";
import { StaffTicket } from "./staff-ticket.entity";
import { Patient } from "./patient.entity";

@Entity('paraclinical_report')
export class ParaclinicalReport {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    note: string;

    @Column()
    paraclinicalDiagnostic: string;

    @Column()
    resultSample: string;

    @OneToOne(() => StaffTicket)
    @JoinColumn()
    staffTicket: StaffTicket;

    @ManyToOne(() => Staff)
    staff: Staff;

    @ManyToOne(() => TypeService)
    typeService: TypeService;

    @ManyToOne(() => Patient, (patient) => patient.paraclinicalReport)
    patient: Patient;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}