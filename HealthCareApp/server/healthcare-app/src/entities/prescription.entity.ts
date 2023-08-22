import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MedicalReport } from "./medical-report.entity";
import { PrescriptionDetail } from "./prescription-detail.entity";
import { Patient } from "./patient.entity";
import { TypePrescription } from "./type-prescription.entity";

@Entity('prescription')
export class Prescription {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => PrescriptionDetail, (prescriptionDetail) => prescriptionDetail.prescription)
    prescriptionDetail: PrescriptionDetail[];

    @ManyToOne(() => Patient, (patient) => patient.prescription)
    patient: Patient;

    @ManyToOne(() => TypePrescription, (typePrescription) => typePrescription.prescription)
    typePrescription: TypePrescription;

    @ManyToOne(() => MedicalReport)
    medicalReport: MedicalReport;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}