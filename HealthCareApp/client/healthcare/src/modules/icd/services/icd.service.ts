import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class IcdService {
    getIcdById(groupId: any) {
        return httpClient.get(apiEndpoints.Icd.GetIcdById + groupId);
    }
}

export const icdService = new IcdService();