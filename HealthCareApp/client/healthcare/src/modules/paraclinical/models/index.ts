export interface ITypeService {
    id: number,
    serviceName: string,
};

export interface IParaclinicalReport {
    id: string;
    note: string;
    paraclinicalDiagnostic: string;
    patientName: string;
    staffName: string;
    serviceName: number;
    staffTicketId: number;
    createdAt: Date
};