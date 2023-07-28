export interface IPatient {
    id: string;
    name: string;
    dob: Date;
    idCard: number;
    address: string;
    gender: string;
    phone: number;
    pob: string;
    job: string;
}

export interface IReceivingCard {
    id: string;
    patientName: string;
    patientId: string;
}