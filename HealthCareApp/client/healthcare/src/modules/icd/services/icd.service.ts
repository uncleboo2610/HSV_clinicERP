import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class IcdService {
    getIcd() {
        return httpClient.get(apiEndpoints.Icd.GetIcd);
    }
}

export const icdService = new IcdService();