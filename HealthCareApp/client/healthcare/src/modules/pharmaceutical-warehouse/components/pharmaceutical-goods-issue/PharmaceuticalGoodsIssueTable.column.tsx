import { ColumnsType } from 'antd/es/table';
import React from 'react'
import { IMedicineTable } from '../../models';

export const usePharmaceuticalGoodsIssueTableColumn = () => {
    const columnsPharmaceuticalGoodsReceipt: ColumnsType<IMedicineTable> = [
        {
            title: 'STT',
            width: 50,
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Tên thuốc',
            dataIndex: 'drugName',
            key: 'drugName',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Đơn vị tính (DVT)',
            dataIndex: 'unit',
            key: 'unit'
        },
        {
            title: 'Loại thuốc',
            dataIndex: 'typeDrugName',
            key: 'typeDrugName'
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity'
        }
    ];
  return {
    columns: [...columnsPharmaceuticalGoodsReceipt],
  }
}
