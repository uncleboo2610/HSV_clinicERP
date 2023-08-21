import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('imagining_diagnostic')
export class ImaginingDiagnostic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    paraclinicalReportId: string;
    
    @Column({ type: 'nvarchar', length: 'MAX' })
    imageUrl: string;
}