import { ColumnsType } from 'antd/es/table';
import { IPrescriptionDetail } from '../models';

export const usePrescriptionDetailTableColumn= () => {
    const columnsPrescriptionDetail: ColumnsType<IPrescriptionDetail> = [
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
          title: 'Liều sáng',
          dataIndex: 'morningDose',
          key: 'morningDose'
        },
        {
            title: 'Liều trưa',
            dataIndex: 'afternoonDose',
            key: 'afternoonDose'
        },
        {
            title: 'Liều tối',
            dataIndex: 'eveningDose',
            key: 'eveningDose'
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note'
        }
    ];
    
  return {
    columns: [...columnsPrescriptionDetail]
  }
}
