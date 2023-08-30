import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class PharmaceuticalWarehouseService {
    getPharmaceuticalWarehouse() {
        return httpClient.get(
            apiEndpoints.PharmaceuticalWarehouse.GetPharmaceuticalWarehousee,
        );
    }
}

export const pharmaceuticalWarehouseService = new PharmaceuticalWarehouseService();