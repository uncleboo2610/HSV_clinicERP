import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class ParaclinicalService {
    getTypeService() {
        return httpClient.get(apiEndpoints.TypeService.getTypeService);
    }
    createParaclinical(data: any) {
        return httpClient.post(apiEndpoints.Paraclinical.AddParaclinic, data);
    }
}

export const paraclinicalService = new ParaclinicalService();