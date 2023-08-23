import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class MedicalStorageService {
    getMedicalStorageById(id: any) {
        return httpClient.get(
            apiEndpoints.MedicalStorage.GetMedicalStorageById + id,
        );
    }
}

export const medicalStoragesService = new MedicalStorageService();