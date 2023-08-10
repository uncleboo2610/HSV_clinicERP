export interface IPatient {
    id: string;
    name: string;
    dob: string;
    idCard: number;
    address: string;
    gender: string;
    phone: number;
    pob: string;
    job: string;
    createdAt: Date;
}

export interface IReceivingCard {
    id: string;
    patientName: string;
    patientId: string;
}

export interface IReceivingCardDetail {
    name: string;
    id: string;
    departmentName: string;
}