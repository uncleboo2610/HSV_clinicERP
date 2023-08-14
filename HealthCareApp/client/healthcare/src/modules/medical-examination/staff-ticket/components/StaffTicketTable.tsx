import React from 'react'
import useStaffTicketDetail from '../hooks/useStaffTicketDetail';
import { TableColumnsType, Table } from 'antd';
import { IStaffTicketDetail } from '../models';

export const StaffTicketTable = () => {
    const [data] = useStaffTicketDetail();

    const columnsStaffTicketDetail: TableColumnsType<IStaffTicketDetail> = [
        { title: 'STT', dataIndex: 'key', key: 'key' },
        { title: 'Dịch vụ', dataIndex: 'serviceName', key: 'serviceName' },
        { title: () => {
            let totalServicePrice = 0;
            dataStaffTicketDetail.forEach(({ servicePrice }) => {
                totalServicePrice += servicePrice;
            });
            return <div>Giá dịch vụ: {totalServicePrice}</div>;
        }, 
            dataIndex: 'servicePrice', 
            key: 'servicePrice' 
        },
    ];
    
    const dataStaffTicketDetail: IStaffTicketDetail[] = data.map((data: any, i) => ({
        key: i + 1,
        id: data.id,
        serviceName: data?.typeService?.serviceName,
        servicePrice: data?.typeService?.servicePrice,
    }));

    let totalServicePrice = 0;
        dataStaffTicketDetail.forEach(({ servicePrice }) => {
            totalServicePrice += servicePrice;
    })

    const dataStaffTicketDetailSummary = [
        ...dataStaffTicketDetail,
        {
            key: dataStaffTicketDetail.length + 1,
            id: dataStaffTicketDetail.length,
            serviceName: 'Tổng',
            servicePrice: totalServicePrice,
        }
    ];
    
  return (
    <>
        <Table
            columns={columnsStaffTicketDetail}
            dataSource={dataStaffTicketDetailSummary}
            pagination={false}
        />
    </>
  )
}
