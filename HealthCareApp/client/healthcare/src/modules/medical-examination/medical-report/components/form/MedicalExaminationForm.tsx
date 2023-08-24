import { Button, Col, DatePicker, Form, Input, Row } from 'antd'
import { BasicNotification } from '../../../../../shared/components/BasicNotification';
import { medicalExaminationService } from '../../services/medical-examination.service';
import { useContext } from 'react';
import { WebsocketContext } from '../../../../../contexts/WebSocketContext';


export const MedicalExaminationForm = (props: any) => {
    const socket = useContext(WebsocketContext);

    const handleSubmit = (value: any) => {
        const data = {
            patientId: props?.patient?.id,
            staffId: value.staffId,
            diagnostic: value.diagnostic,
            reExaminationDate: value.reExaminationDate,
        };
        medicalExaminationService.createMedicalExamination(data)
            .then((e) => {
                socket.emit('newMedicalReport', { to: socket.id });
                BasicNotification(
                    "success",
                    "Success",
                    "Đã lưu giấy khám bệnh thành công !",
                )
            })
            .catch((e) => {
                BasicNotification(
                    "error",
                    "Error",
                    "Failed to update data !",
                );
                console.log(e);
            });
    };

  return (
    <Form
        name="medicalexamination-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
    >
        <Row style={{marginTop: '1rem', marginBottom: '1rem'}}>
            <Col span={14}>
                <div>
                    <span>Mã bệnh nhân: {props?.patient?.id}</span>
                </div>
            </Col>
            <Col span={10}>
                <div>
                    <span>Họ tên bệnh nhân: {props?.patient?.name}</span>
                </div>
            </Col>
        </Row>

        <Form.Item
            label="Bác sĩ"
            name="staffId"
            rules={[{ required: true, message: 'Please input staffId!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Chuẩn đoán sơ bộ"
            name="diagnostic"
            rules={[{ required: true, message: 'Please input your diagnostic!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Ngày tái khám"
            name="reExaminationDate"
            rules={[{ required: true, message: 'Please input check-up date!' }]}
        >
            <DatePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Lưu báo cáo khám bệnh
            </Button>
        </Form.Item>
    </Form>
  )
}
