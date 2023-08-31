import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class PharmaceuticalWarehouseService {
    getPharmaceuticalWarehouse() {
        return httpClient.get(
            apiEndpoints.PharmaceuticalWarehouse.GetPharmaceuticalWarehousee,
        );
    }
    createPharmaceuticalWarehouse(data: any) {
        return httpClient.post(
            apiEndpoints.PharmaceuticalWarehouse.AddPharmaceuticalWarehousee,
            data
        );
    }
}

export const pharmaceuticalWarehouseService = new PharmaceuticalWarehouseService();