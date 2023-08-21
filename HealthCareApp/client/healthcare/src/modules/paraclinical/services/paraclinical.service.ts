import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class ParaclinicalService {
    getTypeService() {
        return httpClient.get(apiEndpoints.TypeService.GetTypeService);
    }

    getParaclinicalReports() {
        return httpClient.get(apiEndpoints.Paraclinical.GetParaclinicalReport);
    }

    createParaclinicalReport(data: any) {
        return httpClient.post(apiEndpoints.Paraclinical.AddParaclinicalReport, data);
    }
}

export const paraclinicalService = new ParaclinicalService();