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

export interface IImaginingDiagnosticRecord {
    id: string;
    note: string;
    paraclinicalDiagnostic: string;
    patientName: string;
    staffName: string;
    resultSample: string;
    createdAt: string;
};

export interface IImaginingDiagnosticImage {
    imageUrl: string;
    paraclinicalReportId: string;
}