import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('DM_ICD')
export class ICD {
    @PrimaryColumn()
    ICD_id: number;

    @Column({ type: 'varchar', length: 20, nullable: true })
    MaICD: string;
    
    @Column({ type: 'nvarchar', length: 200, nullable: true })
    TenICD: string;

    @Column({ type: 'nvarchar', length: 200, nullable: true })
    TenICD_En: string;

    @Column({ type: 'nvarchar', length: 200, nullable: true })
    TenICD_Ru: string;

    @Column({ type: 'char', length: 3, nullable: true })
    MucICD: number;

    @Column({ type: 'int', nullable: true })
    ICD_Nhom_Id: number;

    @Column({ type: 'varchar', length: 7, nullable: true })
    PhanNhom: string;

    @Column({ type: 'smallint', nullable: true })
    Loai: number;

    @Column({ type: 'bit', nullable: false })
    BenhTruyenNhiem: number;

    @Column({ type: 'bit', nullable: true })
    TamNgung: number;

    @Column({ type: 'nvarchar', length: 200, nullable: true })
    TenKhongDau: string;

    @Column({ nullable: true })
    NgayTao: Date;

    @Column({ nullable: true })
    NguoiTao_Id: number;

    @Column({ nullable: true })
    NgayCapNhat: Date;

    @Column({ nullable: true })
    NguoiCapNhat_Id: number;

    @Column({ nullable: true })
    Ma: number;
}