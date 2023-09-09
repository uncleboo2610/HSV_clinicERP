export type PharmaceuticalWarehouseParams = {
    quantity: number;
}

export type PharmaceuticalGoodsReceiptParams = {
    drugName: string;
    price: number;
    unit: string;
    typeDrugName: string;
    typeDrugId: number;
    quantity: number;
}

export type PharmaceuticalGoodsReceiptNoteParams = {
    inputInStock: string;
    location: string;
}

export type PharmaceuticalGoodsIssueNoteParams = {
    exportInStock: string;
    location: string;
}

export type PharmaceuticalGoodsIssueParams = {
    quantity: number;
    drugId: number;
}