export interface IPrescriptionPDF {
    id: number;
    note: string;
    drugName: string;
    drugId: number;
    morningDose: number;
    afternoonDose: number;
    eveningDose: number;
}

export interface IPrescriptionDetail {
    note: string;
    drugName: string;
    morningDose: number;
    afternoonDose: number;
    eveningDose: number;
    quantity: number;
}

export interface IMedicineStorage {
    id: number;
    drugId: number;
    drugName: string;
    typeDrugId: number;
    typeDrugName: string;
    quantity: number;
}