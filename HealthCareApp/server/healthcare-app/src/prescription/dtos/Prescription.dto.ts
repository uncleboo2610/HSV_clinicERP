export class PrescriptionDetailDrugDto {
    morningDose: number;
    afternoonDose: number;
    eveningDose: number;
    prescriptionId: number;
    quantity: number;
    note: string;
    drugName: string;
}

export class PrescriptionDetailDto {
    prescriptionId: number;
    drug: PrescriptionDetailDrugDto[];
}

export class PrescriptionDto {
    patientId: string;
    medicalReportId: string;
}

export class PrescriptionByIdDto {
    id: number;
}