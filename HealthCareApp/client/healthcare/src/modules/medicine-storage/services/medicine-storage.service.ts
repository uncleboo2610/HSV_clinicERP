import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class MedicineStorageService {
    getMedicineStorage() {
        return httpClient.get(
            apiEndpoints.MedicineStorage.GetMedicineStorage,
        );
    }
}

export const medicineStoragesService = new MedicineStorageService();