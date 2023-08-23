import { httpClient } from "../../../../../core/http";
import { apiEndpoints } from "../../../../../shared/config/api.config";

class ImaginingDiagnosticService {
    getImaginingDiagnosticImages() {
        return httpClient.get(apiEndpoints.Image.ImaginingDiagnostic.GetImaginingDiagnosticImages);
    }

    getImaginingDiagnosticImagesById(id: any) {
        return httpClient.get(apiEndpoints.Image.ImaginingDiagnostic.GetImaginingDiagnosticImagesById + id);
    }

    createImaginingDiagnosticImage(data: any) {
        return httpClient.post(apiEndpoints.Image.ImaginingDiagnostic.AddImaginingDiagnosticImages, data);
    }
}

export const imaginingDiagnosticService = new ImaginingDiagnosticService();