export interface IMedicineTable {
    drugName: string,
    price: number,
    unit: string,
    typeDrugName: string,
    quantity: number
}

export interface PharmaceuticalGoodsReceipt {
    drugName: string,
    price: number,
    unit: string,
    typeDrugId: number,
    typeDrugName: string,
    quantity: number
}