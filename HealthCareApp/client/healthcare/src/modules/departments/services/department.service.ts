import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";

class DepartmentService {
    getDepartment() {
        return httpClient.get(apiEndpoints.Department.GetDepartment);
    }
}

export const departmentService = new DepartmentService();