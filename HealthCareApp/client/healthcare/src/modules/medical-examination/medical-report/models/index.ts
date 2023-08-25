export interface IStaffTicket {
    id: number;
    patientName: string;
    patientId: string;
    note: string;
}

export interface IMedicalReport {
    diagnostic: string;
    reExaminationDate: string;
}

export interface ITypeSolution {
    id: number;
    solutionName: string;
}