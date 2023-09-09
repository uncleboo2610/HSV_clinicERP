import React, { useContext, useEffect, useState } from 'react'
import { IPrescriptionDetail } from '../../../prescription/models';
import { Col, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { WebsocketContext } from '../../../../../contexts/WebSocketContext';
import Title from 'antd/es/typography/Title';
import { IPatient } from '../../../../patients/models';

export const MedicalRecordPdfForm = (props: any) => {
    const [dataPdf, setDataPdf] = useState<[]>([]);
    const [patient, setPatient] = useState<IPatient>();
    const socket = useContext(WebsocketContext);

    useEffect(() => {
        socket.on('connect', () => {
        });

        socket.on('onCheckMedicalRecordDetail', (newMessage) => {
            setDataPdf(newMessage.content.prescriptionDetail);
            setPatient(newMessage.content.patient);
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

    const dataPrescriptionDetail: IPrescriptionDetail[] = dataPdf.map((prescriptionDetail: any, i) => ({
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
        <div style={{padding: '50px'}}>
            <Title level={2} style={{textAlign: 'center'}}>BỆNH ÁN</Title>
            <Row style={{marginTop: '1rem'}}>
                <Col span={10}>
                    <div>
                        <span>Họ tên bệnh nhân: {patient?.name}</span>
                    </div>
                </Col>
                <Col span={14}>
                    <div>
                        <span>Giới tính: {patient?.gender}</span>
                    </div>
                </Col>
                <Col span={24}>
                    <div>
                        <span>Ngày sinh: {patient?.dob}</span>
                    </div>
                </Col>
                <Col span={24}>
                    <div>
                        <span>Địa chỉ: {patient?.address}</span>
                    </div>
                </Col>

                <Col span={24}>
                    <div>
                        <span>Chấn đoán: {props.record?.diagnostic}</span>
                    </div>
                </Col>
            </Row>
            <Table
                columns={columnsPrescriptionDetail}
                dataSource={dataPrescriptionDetail}
                pagination={false}
            />
        </div>
    </>
  )
}
