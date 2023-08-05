import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class DrugService {
    getDrug() {
        return httpClient.get(apiEndpoints.Drug.getDrug);
    }
    createDrug(data: any) {
        return httpClient.post(apiEndpoints.Drug.createDrug, data);
    }
}

export const drugService = new DrugService();