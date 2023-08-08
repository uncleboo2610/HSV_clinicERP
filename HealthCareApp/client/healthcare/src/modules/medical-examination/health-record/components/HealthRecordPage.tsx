import React, { useContext } from 'react'
import usePrescription from '../../prescription/hook/usePrescription'
import { UploadOutlined } from '@ant-design/icons';
import { Row, Space, Button, Modal, Col } from 'antd';
import { PrescriptionPdfForm } from '../../prescription/component/form/PrescriptionPdfForm';
import { WebsocketContext } from '../../../../contexts/WebSocketContext';
import { HealthRecordTable } from './HealthRecordTable';

export const HealthRecordPage = (props: any) => {
    const socket = useContext(WebsocketContext);

    const onCheck = () => {
        socket.emit('newPrescription', props?.patient?.patientId)
    };

  return (
    <>
        <Row>
            <Space>
                <Button type="primary" onClick={onCheck}>Xem bệnh án</Button>
                <Button icon={<UploadOutlined />} >In</Button>
            </Space>
        </Row>
        <Row style={{marginTop: '1rem', marginBottom: '1rem'}}>
            <Col span={10}>
                <div>
                    <span>Mã bệnh nhân: {props?.patient?.patientId}</span>
                </div>
            </Col>
            <Col span={14}>
                <div>
                    <span>Họ tên bệnh nhân: {props?.patient?.patientName}</span>
                </div>
            </Col>
        </Row>
        <HealthRecordTable />
    </>
  )
}
