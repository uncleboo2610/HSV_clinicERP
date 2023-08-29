import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react'
import { IIcd } from '../models';

export const useIcdTableColumn = () => {
    
    const columnsIcd: ColumnsType<IIcd> = [
        {
            title: 'Mã ICD',
            dataIndex: 'dmIcdMaIcd',
            key: 'dmIcdMaIcd',
        },
        {
            title: 'Tên ICD',
            dataIndex: 'dmIcdTenIcd',
            key: 'dmIcdTenIcd'
        },
        {
            title: 'Tên ICD(EN)',
            dataIndex: 'dmIcdTenIcdEn',
            key: 'dmIcdTenIcdEn'
        },
        {
            title: 'Tên ICD(RU)',
            width: 50,
            dataIndex: 'TenICD_Ru',
            key: 'TenICD_Ru',
        },
    ];

    const icdTypeOptions = [
        { value: 'A', label: 'Jack' },
        { value: 'Lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'yiminghe' },
        { value: 'disabled', label: 'Disabled', disabled: true },
        { value: 'jack1', label: 'Jack1' },
        { value: 'Lucy1', label: 'Lucy1' },
        { value: 'Yiminghe1', label: 'yiminghe1' },
        { value: 'jack2', label: 'Jack1' },
        { value: 'Lucy2', label: 'Lucy1' },
        { value: 'Yiminghe2', label: 'yiminghe1' },
    ];
  return {
    columns: columnsIcd,
    options: icdTypeOptions
  }
}
