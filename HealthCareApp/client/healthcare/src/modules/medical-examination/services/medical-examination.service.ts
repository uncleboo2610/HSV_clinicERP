import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class MedicalExaminationService {
    createMedicalExamination(data: any) {
        return httpClient.post(
            apiEndpoints.MedicalReport.AddMedicalReport,
            data,
        );
    }

    getStaffTicket() {
        return httpClient.get(
            apiEndpoints.Staff.getStaffTicket,
        );
    }

    createStaffTicket(data: any) {
        return httpClient.post(
            apiEndpoints.Staff.createStaffTicket,
            data
        );
    }
}

export const medicalExaminationService = new MedicalExaminationService();