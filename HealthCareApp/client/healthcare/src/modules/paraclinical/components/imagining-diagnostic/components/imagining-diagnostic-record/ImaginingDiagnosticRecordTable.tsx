import { Table, Modal } from 'antd';
import React, { useContext, useState } from 'react'
import { WebsocketContext } from '../../../../../../contexts/WebSocketContext';
import useImaginingDiagnosticRecord from '../../../../hooks/useImaginingDiagnosticRecord';

export const ImaginingDiagnosticRecordTable = () => {
    const socket = useContext(WebsocketContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data] = useImaginingDiagnosticRecord();

    console.log(data)

    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleOk = () => {
        setIsModalOpen(false);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    // const columnsPrescription: TableColumnsType<IHealthRecord> = [
    //     { title: 'STT', dataIndex: 'key', key: 'key' },
    //     { title: 'Khoa', dataIndex: 'department', key: 'department' },
    //     { title: 'Chuẩn Đoán', dataIndex: 'diagnostic', key: 'diagnostic' },
    //     { title: 'Hẹn tái khám', dataIndex: 'reExaminationDate', key: 'reExaminationDate' },
    //     { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    // ];
    
    // const dataPrescription: IHealthRecord[] = data.map((record: any, i) => ({
    //     key: i + 1,
    //     id: record.id,
    //     diagnostic: record?.medicalReport?.diagnostic,
    //     department: record?.medicalReport?.staff?.department?.departmentName,
    //     reExaminationDate: record?.medicalReport?.reExaminationDate,
    //     createdAt: record.createdAt,
    // }))
  return (
    <>
        <Table
            // columns={columnsPrescription}
            // dataSource={dataPrescription}
            onRow={(record, rowIndex) => {
                return {
                onClick: event => {

                }, // click row
                onDoubleClick: event => {
                    showModal();
                    // socket.emit('checkImaginingDiagnosticRecord', {to: socket.id, data: record.id});
                }, // double click row
            }}}
        />
        <Modal 
            title="Toa thuốc" 
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel} 
            style={{minWidth: '1300px'}}
        >
            {/* <HealthRecordDetail /> */}
        </Modal>
    </>
  )
}
