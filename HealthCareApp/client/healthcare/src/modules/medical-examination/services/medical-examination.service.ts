import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class MedicalExaminationService {
    createMedicalExamination(data: any) {
        return httpClient.post(
            apiEndpoints.MedicalReport.AddMedicalReport,
            data,
        );
    }
}

export const medicalExaminationService = new MedicalExaminationService();