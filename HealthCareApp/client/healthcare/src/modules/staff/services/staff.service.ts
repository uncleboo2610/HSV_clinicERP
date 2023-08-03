import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";
import { authService } from "../../auth/services/auth.service";

class StaffService {
    
    getStaffTicket() {
        return httpClient.get(
            apiEndpoints.Staff.getStaffTicket,
            );
        }
        
    getProfile() {
        const user = authService.getToken();
        return httpClient.get(
            apiEndpoints.Staff.getProfile,
            { headers: {"token" : `${user}`} }
        );
    }

    createStaffTicket(data: any) {
        return httpClient.post(
            apiEndpoints.Staff.createStaffTicket,
            data
        );
    }
}

export const staffService = new StaffService();