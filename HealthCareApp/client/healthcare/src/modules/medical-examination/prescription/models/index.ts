export interface IPrescriptionPDF {
    id: number;
    note: string;
    drugName: string[];
    drugId: number[];
    morningDose: number;
    afternoonDose: number;
    eveningDose: number;
}