import { UploadOutlined } from '@ant-design/icons'
import { Row, Space, Button, Col } from 'antd'
import React, { useContext } from 'react'
import { WebsocketContext } from '../../../../../../contexts/WebSocketContext'
import { ImaginingDiagnosticRecordTable } from './ImaginingDiagnosticRecordTable'

export const ImaginingDiagnosticRecordPage = (props: any) => {
    const socket = useContext(WebsocketContext);

    const onCheck = () => {
        socket.emit('checkParaclinicalRecord', {to: socket.id, data: props?.ticket?.patientId})
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
                    {/* <span>Mã bệnh nhân: {props?.patient?.id}</span> */}
                </div>
            </Col>
            <Col span={14}>
                <div>
                    {/* <span>Họ tên bệnh nhân: {props?.patient?.name}</span> */}
                </div>
            </Col>
        </Row>
        <ImaginingDiagnosticRecordTable />
    </>
  )
}
