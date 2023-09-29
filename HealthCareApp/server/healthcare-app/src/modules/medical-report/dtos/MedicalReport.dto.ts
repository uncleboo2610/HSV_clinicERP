export class MedicalReportDto {
    patientId: string;
    reExaminationDate: Date;
    diagnostic: string;
    staffId: string;
    typeSolutionId: number[];
    diseaseIcd: string;
    comorbidityId: string[]
}