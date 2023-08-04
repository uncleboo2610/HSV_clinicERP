import { httpClient } from "../../../../core/http";
import { apiEndpoints } from "../../../../shared/config/api.config";

class PrescriptionService {
    getPrescriptions() {
        return httpClient.get(apiEndpoints.Prescription.getPrescription);
    }

    getPrescriptionDetails() {
        return httpClient.get(apiEndpoints.Prescription.getPrescriptionDetail);
    }

    createPrescription(data: any) {
        return httpClient.post(
            apiEndpoints.Prescription.createPrescription,
            data,
        );
    }

    createPrescriptionDetail(data: any) {
        return httpClient.post(
            apiEndpoints.Prescription.createPrescriptionDetail,
            data,
        );
    }
}

export const prescriptionService = new PrescriptionService();