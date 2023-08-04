import { IdcardOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space, Tooltip, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react'
import usePatient from '../../../../patients/hooks/usePatient';
import { IPatient } from '../../../../patients/models';

export const PrescriptionPdfForm = () => {
    const [ data ] = usePatient();
            
    const dataPatient: IPatient[] = data.map((patient, i) => ({
        key: i + 1,
        id: patient.id,
        name: patient.name,
        dob: patient.dob,
        idCard: patient.idCard,
        address: patient.address,
        gender: patient.gender,
        phone: patient.phone,
        pob: patient.pob,
        job: patient.job,
    }));

    const columnsPatient: ColumnsType<IPatient> = [
        {
            title: 'STT',
            width: 50,
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Họ tên',
            width: 100,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'CCCD/CMND',
            width: 100,
            dataIndex: 'idCard',
            key: 'idCard',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: '1',
            width: 150,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: '2',
            width: 150,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: '3',
            width: 150,
        },
        {
            title: 'Nơi sinh',
            dataIndex: 'pob',
            key: '4',
            width: 150,
        },
        {
            title: 'Nghề nghiệp',
            dataIndex: 'job',
            key: '5',
            width: 150,
        },
    ];

  return (
    <Table
        columns={columnsPatient}
        dataSource={dataPatient}
        pagination={false}
    />
  )
}
