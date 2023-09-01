const apiBaseUrl = `http://localhost:2023`;

export const apiEndpoints = {
    Auth: {
        LogIn: `${apiBaseUrl}/auth/login`,
    },
    Patient: {
        GetPatient: `${apiBaseUrl}/patients/get-patients`,
        GetPatientById: `${apiBaseUrl}/patients/get-patient-by-id/`,
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
        GetMedicalReport: `${apiBaseUrl}/medical-report/get-medical-reports`,
        AddMedicalReport: `${apiBaseUrl}/medical-report/create-medical-report`,
    },
    PharmaceuticalWarehouse: {
        GetPharmaceuticalWarehouse: `${apiBaseUrl}/pharmaceutical-warehouse/get-pharmaceutical-warehouses`,
        AddPharmaceuticalGoodsReceipt: `${apiBaseUrl}/pharmaceutical-warehouse/create-pharmaceutical-goods-receipt`,
        AddPharmaceuticalGoodsIssue: `${apiBaseUrl}/pharmaceutical-warehouse/create-pharmaceutical-goods-issue`,
    },
    Paraclinical: {
        GetParaclinicalReport: `${apiBaseUrl}/paraclinical/get-paraclinical-reports`,
        AddParaclinicalReport: `${apiBaseUrl}/paraclinical/create-paraclinical-report`,
    },
    Staff: {
        GetStaffTicket: `${apiBaseUrl}/staff/get-staff-tickets`,
        GetProfile: `${apiBaseUrl}/staff/get-profile`,
        AddStaffTicket: `${apiBaseUrl}/staff/create-staff-ticket`,
        AddStaffTicketDetail: `${apiBaseUrl}/staff/create-staff-ticket-detail`,
    },
    TypeService: {
        GetTypeService: `${apiBaseUrl}/type-service/get-type-services`,
    },
    TypeSolution: {
        GetTypeSolution: `${apiBaseUrl}/type-solution/get-type-solutions`,
    },
    Prescription: {
        GetPrescription: `${apiBaseUrl}/prescription/get-prescriptions`,
        GetPrescriptionById: `${apiBaseUrl}/prescription/get-prescription-by-id/`,
        GetPrescriptionDetail: `${apiBaseUrl}/prescription/get-prescription-details`,
        AddPrescription: `${apiBaseUrl}/prescription/create-prescription`,
        AddPrescriptionDetail: `${apiBaseUrl}/prescription/create-prescription-detail`,
    },
    Drug: {
        GetDrug: `${apiBaseUrl}/drug/get-drugs`,
        GetTypeDrug: `${apiBaseUrl}/drug/get-type-drugs`,
        AddDrug: `${apiBaseUrl}/drug/create-drug`,
    },
    Image: {
        ImaginingDiagnostic: {
            GetImaginingDiagnosticImages: `${apiBaseUrl}/imagining-diagnostic/get-imagining-diagnostic-images`,
            GetImaginingDiagnosticImagesById: `${apiBaseUrl}/imagining-diagnostic/get-imagining-diagnostic-images-by-id/`,
            AddImaginingDiagnosticImages: `${apiBaseUrl}/imagining-diagnostic/create-imagining-diagnostic-image`,
        }
    },
    Icd: {
        GetIcdById: `${apiBaseUrl}/icd/get-icd-by-id/`,
    }
}