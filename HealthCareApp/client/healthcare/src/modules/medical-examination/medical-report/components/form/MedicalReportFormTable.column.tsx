import { ColumnsType } from 'antd/es/table';
import React from 'react'
import { IIcd } from '../../../../icd/models';

export const useMedicalReportFormTableColumn = () => {
    const columnsIcd: ColumnsType<IIcd> = [
        {
            title: 'Mã ICD',
            dataIndex: 'dmIcdMaIcd',
            key: 'dmIcdMaIcd',
        },
        {
            title: 'Tên ICD',
            dataIndex: 'dmIcdTenIcd',
            key: 'dmIcdTenIcd',
        },
        {
            title: 'Tên ICD(EN)',
            dataIndex: 'dmIcdTenIcdEn',
            key: 'dmIcdTenIcdEn',
        },
        {
            title: 'Tên ICD(RU)',
            dataIndex: 'TenICD_Ru',
            key: 'TenICD_Ru',
        },
    ];
  return {
    columns: columnsIcd
  }
}
