const apiBaseUrl = `http://localhost:2023`;

export const apiEndpoints = {
    Auth: {
        LogIn: `${apiBaseUrl}/auth/login`,
    },
    Patient: {
        GetPatients: `${apiBaseUrl}/patients/get-patients`,
        GetPatientById: `${apiBaseUrl}/patients/get-patient-by-id`,
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
        getProfile: `${apiBaseUrl}/staff/get-profile`,
        createStaffTicket: `${apiBaseUrl}/staff/create-staff-ticket`,
    },
    TypeService: {
        getTypeService: `${apiBaseUrl}/type-service/get-type-services`,
    },
    Prescription: {
        getPrescription: `${apiBaseUrl}/prescription/get-prescriptions`,
        getPrescriptionById: `${apiBaseUrl}/prescription/get-prescription-by-id`,
        getPrescriptionDetail: `${apiBaseUrl}/prescription/get-prescription-details`,
        createPrescription: `${apiBaseUrl}/prescription/create-prescription`,
        createPrescriptionDetail: `${apiBaseUrl}/prescription/create-prescription-detail`,
    },
    Drug: {
        getDrug: `${apiBaseUrl}/drug/get-drugs`,
        createDrug: `${apiBaseUrl}/dug/create-drug`,
    }
}