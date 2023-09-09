import { TableColumnsType, Table, Modal, Space, Tooltip } from 'antd';
import React, { useContext, useRef, useState } from 'react'
import { IMedicalRecord } from '../models';
import { WebsocketContext } from '../../../../contexts/WebSocketContext';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import useMedicalRecord from '../hooks/useHealthRecord';
import { MedicalRecordDetail } from './MedicalRecordDetail';
import { useReactToPrint } from 'react-to-print';
import { MedicalRecordPdfForm } from './form/MedicalRecordPdfForm';

export const MedicalRecordTable = () => {
    const socket = useContext(WebsocketContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalPdfOpen, setIsModalPdfOpen] = useState(false);
    const [data] = useMedicalRecord();

    const componentPDF = useRef(null);
    const generatePDF = useReactToPrint({
      content: () => componentPDF.current,
      documentTitle: "Toa",
    });

    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleOk = () => {
        setIsModalOpen(false);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    const columnsPrescription: TableColumnsType<IMedicalRecord> = [
        { title: 'STT', dataIndex: 'key', key: 'key' },
        { title: 'Khoa', dataIndex: 'department', key: 'department' },
        { title: 'Chuẩn Đoán', dataIndex: 'diagnostic', key: 'diagnostic' },
        { title: 'Hẹn tái khám', dataIndex: 'reExaminationDate', key: 'reExaminationDate' },
        { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
        {
            title: 'Tương tác',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <>
                    <Space>
                        <Tooltip title={'In'}>
                            <UploadOutlined
                                style={{ fontSize: "1.2rem", color: "green" }}
                                onClick={() => {
                                    socket.emit('checkMedicalRecordDetail', {to: socket.id, data: record.id});
                                    setIsModalPdfOpen(true);
                                    console.log(record);
                                }} 
                            />
                        </Tooltip>
                                    <>
                                        <Modal 
                                            style={{minWidth: '1300px'}} 
                                            open={isModalPdfOpen} 
                                            onOk={() => {
                                                generatePDF()
                                                setIsModalPdfOpen(false);
                                            }} 
                                            onCancel={() => 
                                                setIsModalPdfOpen(false)
                                            }
                                        >
                                            <div ref={componentPDF}>
                                                <MedicalRecordPdfForm record={record} />
                                            </div>
                                        </Modal>
                                    </>
                        <Tooltip title={'Chỉnh sửa'}>
                            <EditOutlined
                                style={{ fontSize: "1.2rem", color: "orange" }}
                                onClick={() => {
                                    console.log('clicked')
                                }}
                            />
                        </Tooltip>
                        <Tooltip title={'Xóa'}>
                            <DeleteOutlined
                                style={{ fontSize: "1.2rem", color: "red" }}
                                onClick={() => {
                                    console.log('clicked')
                                }}
                            />
                        </Tooltip>
                        {/* <ModalReceivingCardForm ref={child} submitModalForm={submitForm} /> */}
                    </Space>
                </>
            ),
        },
    ];
    
    const dataPrescription: IMedicalRecord[] = data.map((record: any, i) => ({
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
            dataSource={dataPrescription}
            onRow={(record, rowIndex) => {
                return {
                onDoubleClick: event => {
                    showModal();
                    socket.emit('checkMedicalRecordDetail', {to: socket.id, data: record.id});
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
            <MedicalRecordDetail />
        </Modal>
    </>
  )
}
