const apiBaseUrl = `http://localhost:2023`;

export const apiEndpoints = {
    Patient: {
        GetPatients: `${apiBaseUrl}/patients/get-patients`,
        AddPatient: `${apiBaseUrl}/patients/create-patient`
    },
    ReceivingCard: {
        GetReceivingCard: `${apiBaseUrl}/receiving-card/get-receiving-cards`,
        GetReceivingCardDetail: `${apiBaseUrl}/receiving-card/get-receiving-card-details`,
        AddReceivingCard: `${apiBaseUrl}/receiving-card/create-receiving-card`,
        AddReceivingCardDetail: `${apiBaseUrl}/receiving-card/create-receiving-card-detail`,
    },
    Department: {
        GetDepartment: `${apiBaseUrl}/department/get-departments`,
    },
    MedicalReport: {
        AddMedicalReport: `${apiBaseUrl}/medical-report/create-medical-report`,
    },
    Paraclinical: {
        AddParaclinic: `${apiBaseUrl}/paraclinical/create-paraclinical-report`,
    },
    Staff: {
        getStaffTicket: `${apiBaseUrl}/staff/get-staff-tickets`,
        createStaffTicket: `${apiBaseUrl}/staff/create-staff-ticket`
    },
    TypeService: {
        getTypeService: `${apiBaseUrl}/type-service/get-type-services`,
    }
}