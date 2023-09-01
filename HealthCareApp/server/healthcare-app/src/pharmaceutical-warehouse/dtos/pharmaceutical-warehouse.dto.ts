export class PharmaceuticalWarehouseDto {
    quantity: number;
    drugId: number;
}

export class PharmaceuticalGoodsReceiptDto {
    drugName: string;
    price: number;
    unit: string;
    typeDrugName: string;
    typeDrugId: number;
    quantity: number;
}

export class PharmaceuticalGoodsIssueDto {
    drugId: number;
    quantity: number;
}