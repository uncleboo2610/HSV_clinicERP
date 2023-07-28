import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class PatientsService {
    getPatients() {
        return httpClient.get(apiEndpoints.Patient.GetPatients);
    }

    getReceivingCard() {
        return httpClient.get(apiEndpoints.ReceivingCard.GetReceivingCard);
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
}

export const patientsService = new PatientsService();