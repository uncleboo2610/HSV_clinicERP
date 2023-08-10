import React from 'react'
import useStaffTicketDetail from '../hooks/useStaffTicketDetail';
import { TableColumnsType, Table } from 'antd';
import { IStaffTicketDetail } from '../models';

export const StaffTicketTable = () => {
    const [data] = useStaffTicketDetail();

    const columnsStaffTicketDetail: TableColumnsType<IStaffTicketDetail> = [
        { title: 'STT', dataIndex: 'key', key: 'key' },
        { title: 'Dịch vụ', dataIndex: 'serviceName', key: 'serviceName' },
    ];
    
    const dataStaffTicketDetail: IStaffTicketDetail[] = data.map((data: any, i) => ({
        key: i + 1,
        id: data.id,
        serviceName: data?.typeService?.serviceName,
    }))
    
  return (
    <>
        <Table
            columns={columnsStaffTicketDetail}
            dataSource={dataStaffTicketDetail}
            pagination={false}
        />
    </>
  )
}
