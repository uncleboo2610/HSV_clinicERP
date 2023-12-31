export class PrescriptionDetailDrugDto {
    morningDose: number;
    afternoonDose: number;
    eveningDose: number;
    prescriptionId: number;
    quantity: number;
    note: string;
    drugName: string;
    pharmaceuticalWarehouseId: number;
}

export class PrescriptionDetailDto {
    prescriptionId: number;
    drug: PrescriptionDetailDrugDto[];
}

export class PrescriptionDto {
    patientId: string;
    medicalReportId: string;
    typePrescriptionId: number;
}

export class PrescriptionByIdDto {
    dataPrescriptionId: number;
}