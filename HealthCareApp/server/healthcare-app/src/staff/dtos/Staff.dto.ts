import { Department } from "src/entities/department.entity";

export class StaffDto {
    name: string;
    dob: Date;
    idCard: number;
    address: string;
    gender: string;
    phone: number;
    pob: string;
    role: string;
    position: string;
    departmentId: number;
}