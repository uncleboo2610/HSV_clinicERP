import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class PharmaceuticalWarehouseService {
    getPharmaceuticalWarehouse() {
        return httpClient.get(
            apiEndpoints.PharmaceuticalWarehouse.GetPharmaceuticalWarehouse,
        );
    }
    createPharmaceuticalGoodsReceipt(data: any) {
        return httpClient.post(
            apiEndpoints.PharmaceuticalWarehouse.AddPharmaceuticalGoodsReceipt,
            data
        );
    }

    createPharmaceuticalGoodsIssue(data: any) {
        return httpClient.put(
            apiEndpoints.PharmaceuticalWarehouse.AddPharmaceuticalGoodsIssue,
            data
        );
    }
}

export const pharmaceuticalWarehouseService = new PharmaceuticalWarehouseService();