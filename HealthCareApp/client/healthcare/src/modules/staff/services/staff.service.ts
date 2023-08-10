import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";
import { authService } from "../../auth/services/auth.service";

class StaffService {
    getProfile() {
        const user = authService.getToken();
        return httpClient.get(
            apiEndpoints.Staff.getProfile,
            { headers: {"token" : `${user}`} }
        );
    }
}

export const staffService = new StaffService();