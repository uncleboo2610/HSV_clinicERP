import { httpClient } from "../../../../core/http";
import { apiEndpoints } from "../../../../shared/config/api.config";

class StaffTicketService {
    
    getStaffTicket() {
        return httpClient.get(
            apiEndpoints.Staff.GetStaffTicket,
            );
        }

    createStaffTicket(data: any) {
        return httpClient.post(
            apiEndpoints.Staff.AddStaffTicket,
            data
        );
    }

    createStaffTicketDetail(data: any) {
        return httpClient.post(
            apiEndpoints.Staff.AddStaffTicketDetail,
            data
        );
    }
}

export const staffTicketService = new StaffTicketService();