import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class PatientsService {
    getPatients() {
        return httpClient.get(apiEndpoints.Patient.GetPatients);
    }

    createPatient(data: any) {
        return httpClient.post(
            apiEndpoints.Patient.AddPatient,
            data,
        );
    }

    createReceivingCard(data: any) {
        return httpClient.post(
            apiEndpoints.Patient.AddReceivingCard,
            data,
        );
    }
}

export const patientsService = new PatientsService();