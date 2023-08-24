export interface IHealthRecord {
    key: React.Key;
    id: number;
    diagnostic: string;
    department: string;
    reExaminationDate: Date;
    createdAt: Date;
}