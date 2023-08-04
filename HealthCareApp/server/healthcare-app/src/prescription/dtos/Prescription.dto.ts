export class PrescriptionDto {
    note: string;
}

export class PrescriptionDetailDto {
    morningDose: number;
    afternoonDose: number;
    eveningDose: number;
    prescriptionId: number;
    drugId: number[];
}