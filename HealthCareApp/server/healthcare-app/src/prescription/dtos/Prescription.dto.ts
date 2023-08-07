export class PrescriptionDetailDto {
    morningDose: number;
    afternoonDose: number;
    eveningDose: number;
    prescriptionId: number;
    quantity: number;
    note: string;
    drugId: number;
}

export class PrescriptionDto {
    patientId: string;
    medicalReportId: string;
}

export class PrescriptionByIdDto {
    id: number;
}