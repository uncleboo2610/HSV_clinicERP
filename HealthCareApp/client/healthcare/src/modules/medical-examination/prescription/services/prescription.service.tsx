import { httpClient } from "../../../../core/http";
import { apiEndpoints } from "../../../../shared/config/api.config";

class PrescriptionService {
    getPrescriptions() {
        return httpClient.get(apiEndpoints.Prescription.GetPrescription);
    }

    getPrescriptionById(data: any) {
        return httpClient.get(
            apiEndpoints.Prescription.GetPrescriptionById,
            data,
        );
    }

    getPrescriptionDetails(id: any) {
        return httpClient.get(
            apiEndpoints.Prescription.GetPrescriptionDetail,
            id
        );
    }

    createPrescription(data: any) {
        return httpClient.post(
            apiEndpoints.Prescription.AddPrescription,
            data
        );
    }

    createPrescriptionDetail(data: any) {
        return httpClient.post(
            apiEndpoints.Prescription.AddPrescriptionDetail,
            data,
        );
    }
}

export const prescriptionService = new PrescriptionService();