const apiBaseUrl = `http://localhost:2023`;

export const apiEndpoints = {
    Patient: {
        GetPatients: `${apiBaseUrl}/patients/get-patients`,
        AddPatient: `${apiBaseUrl}/patients/create-patient`,
        AddReceivingCard: `${apiBaseUrl}/receiving-card/create-receiving-card`,
    },
    Department: {
        GetDepartment: `${apiBaseUrl}/department/get-departments`,
    }
}