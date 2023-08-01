import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class ParaclinicalService {
    createParaclinical() {
        return httpClient.post(apiEndpoints.Paraclinical.AddParaclinic);
    }
}

export const paraclinicalService = new ParaclinicalService();