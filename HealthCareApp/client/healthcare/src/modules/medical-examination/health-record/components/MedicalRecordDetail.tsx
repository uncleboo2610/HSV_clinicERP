import React, { useContext, useEffect, useState } from 'react'
import { WebsocketContext } from '../../../../contexts/WebSocketContext';
import { Table } from 'antd';
import { IPrescriptionDetail } from '../../prescription/models';
import { ColumnsType } from 'antd/es/table';

export const MedicalRecordDetail = () => {
    const [prescription, setPrescription] = useState([]);
    const socket = useContext(WebsocketContext);

    useEffect(() => {
        socket.on('connect', () => {
        });

        socket.on('onCheckMedicalRecordDetail', (newMessage) => {
            setPrescription(newMessage.content.prescriptionDetail);
        });

        return () => {
            socket.off('connect');
            socket.off('onCheckMedicalRecordDetail');
        };
    }, []);
    
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
        },
    ];

    const dataPrescriptionDetail: IPrescriptionDetail[] = prescription?.map((prescriptionDetail: any, i) => ({
        key: i + 1,
        id: prescriptionDetail?.id,
        drugName: prescriptionDetail?.drug.drugName,
        drugId: prescriptionDetail?.drugId,
        morningDose: prescriptionDetail?.morningDose,
        afternoonDose: prescriptionDetail?.afternoonDose,
        eveningDose: prescriptionDetail?.eveningDose,
        quantity: prescriptionDetail?.quantity,
        note: prescriptionDetail?.note
    }));
  return (
    <>
        <Table
            columns={columnsPrescriptionDetail}
            dataSource={dataPrescriptionDetail}
            pagination={false}
        />
    </>
  )
}
