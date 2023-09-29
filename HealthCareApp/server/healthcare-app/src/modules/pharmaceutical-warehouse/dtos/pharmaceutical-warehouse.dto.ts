export class PharmaceuticalWarehouseDto {
    quantity: number;
    drugId: number;
}

export class PharmaceuticalGoodsReceiptNoteDto {
    inputInStock: string;
    location: string;
}

export class PharmaceuticalGoodsIssueNoteDto {
    exportInStock: string;
    location: string;
}

export class PharmaceuticalGoodsReceiptDto {
    detail: PharmaceuticalGoodsReceiptDetailDto[];
    pharmaceuticalGoodsReceiptNoteId: number;
}

export class PharmaceuticalGoodsReceiptDetailDto {
    drugName: string;
    price: number;
    unit: string;
    typeDrugName: string;
    typeDrugId: number;
    quantity: number;
}

export class PharmaceuticalGoodsIssueDto {
    detail: PharmaceuticalGoodsIssueDetailDto[];
    pharmaceuticalGoodsIssueNoteId: number;
}

export class PharmaceuticalGoodsIssueDetailDto {
    drugId: number;
    quantity: number;
}