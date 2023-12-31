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
    username: string;
    password: string;
    confirmPassword: string;
}

export class StaffTicketDto {
    note: string;
    patientId: string;
}

export class StaffTicketDetailDto {
    note: string;
    staffTicketId: number;
    typeServiceId: number[];
}