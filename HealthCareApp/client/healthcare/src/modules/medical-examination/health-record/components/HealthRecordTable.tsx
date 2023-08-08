import { DownOutlined } from '@ant-design/icons';
import { TableColumnsType, Badge, Space, Dropdown, Table } from 'antd';
import React from 'react'
import usePrescription from '../../prescription/hook/usePrescription';
import { IHealthRecord } from '../models';
  
interface ExpandedDataType {
    key: React.Key;
    date: string;
    name: string;
    upgradeNum: string;
}

export const HealthRecordTable = () => {
    const [data] = usePrescription();
    console.log(data)

    const expandedRowRender = (record: any) => {
        const columns: TableColumnsType<ExpandedDataType> = [
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        ];
    
        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i.toString(),
                date: '2014-12-24 23:12:00',
                name: record.key,
                upgradeNum: 'Upgraded: 56',
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} rowKey={(record) => record.key}/>;
    };
    
    const columnsPrescription: TableColumnsType<IHealthRecord> = [
        { title: 'STT', dataIndex: 'key', key: 'key' },
        { title: 'Khoa', dataIndex: 'department', key: 'department' },
        { title: 'Chuẩn Đoán', dataIndex: 'diagnostic', key: 'diagnostic' },
        { title: 'Hẹn tái khám', dataIndex: 'reExaminationDate', key: 'reExaminationDate' },
        { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    ];
    
    const dataPrescription: IHealthRecord[] = data.map((record: any, i) => ({
        key: i + 1,
        id: record.id,
        diagnostic: record?.medicalReport?.diagnostic,
        department: record?.medicalReport?.staff?.department?.departmentName,
        reExaminationDate: record?.medicalReport?.reExaminationDate,
        createdAt: record.createdAt,
    }))
  return (
    <>
        <Table
            columns={columnsPrescription}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
            dataSource={dataPrescription}
            rowKey={(record) => record.key}
        />
    </>
  )
}
