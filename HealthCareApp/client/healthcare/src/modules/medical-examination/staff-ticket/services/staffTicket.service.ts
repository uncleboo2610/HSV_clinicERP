import { httpClient } from "../../../../core/http";
import { apiEndpoints } from "../../../../shared/config/api.config";

class StaffTicketService {
    
    getStaffTicket() {
        return httpClient.get(
            apiEndpoints.Staff.getStaffTicket,
            );
        }

    createStaffTicket(data: any) {
        return httpClient.post(
            apiEndpoints.Staff.createStaffTicket,
            data
        );
    }

    createStaffTicketDetail(data: any) {
        return httpClient.post(
            apiEndpoints.Staff.createStaffTicketDetail,
            data
        );
    }
}

export const staffTicketService = new StaffTicketService();