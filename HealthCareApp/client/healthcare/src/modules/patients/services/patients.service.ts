import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class PatientsService {
    getPatients() {
        return httpClient.get(apiEndpoints.Patient.GetPatient);
    }

    getPatientById(data: any) {
        return httpClient.get(
            apiEndpoints.Patient.GetPatientById,
            data,
        );
    }

    getReceivingCard() {
        return httpClient.get(apiEndpoints.ReceivingCard.GetReceivingCard);
    }

    getReceivingCardDetail() {
        return httpClient.get(apiEndpoints.ReceivingCard.GetReceivingCardDetail);
    }

    createPatient(data: any) {
        return httpClient.post(
            apiEndpoints.Patient.AddPatient,
            data,
        );
    }

    createReceivingCard(data: any) {
        return httpClient.post(
            apiEndpoints.ReceivingCard.AddReceivingCard,
            data,
        );
    }

    createReceivingCardDetail(data: any) {
        return httpClient.post(
            apiEndpoints.ReceivingCard.AddReceivingCardDetail,
            data,
        );
    }
}

export const patientsService = new PatientsService();