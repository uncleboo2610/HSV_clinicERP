import React, { useEffect, useState } from 'react'
import { PrescriptionForm } from './form/PrescriptionForm'
import { Button, Space, Table, Upload } from 'antd'
import { IPrescriptionDetail } from '../models';
import { ColumnsType } from 'antd/es/table';
import { prescriptionService } from '../services/prescription.service';
import usePrescription from '../hook/usePrescriptionDetail';
import { UploadOutlined } from '@ant-design/icons';

export const PrescriptionPage = () => {
    const [value, setValue] = useState<IPrescriptionDetail | null>();
    const [ data ] = usePrescription();

    const columnsDrug: ColumnsType<IPrescriptionDetail> = [
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
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note'
        }
    ];

    // const dataDrug: IPrescriptionDetail[] = data.map((staffTicket: any, i) => ({
    //     key: i + 1,
    //     id: staffTicket?.id,
    //     patientName: staffTicket?.patient?.name,
    //     patientId: staffTicket?.patient?.id,
    //     note: staffTicket?.note
    // }))

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IPrescriptionDetail[]) => {
            selectedRows.map((values) => {
                setValue(values);
            })
        },
    };
  return (
    <>
        <Space>
            <Button type="primary">Tạo toa thuốc</Button>
            <Upload>
                <Button icon={<UploadOutlined />}>In toa</Button>
            </Upload>
        </Space>
        <PrescriptionForm />
        <Table
            rowSelection={{
                type: 'radio',
                ...rowSelection,
            }}
            columns={columnsDrug}
            // dataSource={dataDrug}
            size='small'
        />
    </>
  )
}
