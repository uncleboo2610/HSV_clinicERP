import { ColumnsType } from 'antd/es/table';
import React from 'react'
import useMedicalReport from '../../medical-report/hooks/useMedicalReport';
import { IMedicalReport } from './PrescriptionPage';

export const usePrescriptionMedicalReportTableColumn = () => {
    const [medicalReportData] = useMedicalReport();
    
    const columnsMedicalReport: ColumnsType<IMedicalReport> = [
        {
            title: 'STT',
            width: 50,
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Mã bệnh nhân',
            dataIndex: 'patientId',
            key: 'patientId',
        },
        {
            title: 'Tên bệnh nhân',
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
          title: 'Chẩn đoán',
          dataIndex: 'diagnostic',
          key: 'diagnostic',
        },
        {
            title: 'Ngày tái khám',
            dataIndex: 'reExaminationDate',
            key: 'reExaminationDate',
        }
    ];
      
    const dataMedicalReport: IMedicalReport[] = medicalReportData?.map((medicalReport: any, i) => ({
        key: i + 1,
        id: medicalReport.id,
        patientId: medicalReport?.patient?.id,
        patientName: medicalReport?.patient?.name,
        diagnostic: medicalReport.diagnostic,
        reExaminationDate: medicalReport.reExaminationDate
    }))

  return {
    columns: [...columnsMedicalReport],
    data: dataMedicalReport,
  }
}
