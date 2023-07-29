import { Button, DatePicker, Form, Input } from 'antd'
import { medicalExaminationService } from '../../services/medical-examination.service';
import { BasicNotification } from '../../../../shared/components/BasicNotification';


export const MedicalExaminationForm = (props: any) => {
    
    const handleSubmit = (value: any) => {
        const data = {
            patientId: props.patientId,
            staffId: value.staffId,
            diagnostic: value.diagnostic,
            reExaminationDate: value.reExaminationDate,
        };
        medicalExaminationService.createMedicalExamination(data)
            .then(() => {
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
        name="medicalexamination"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
    >
        <Form.Item
            label="Mã bệnh nhân"
            name="patientId"
        >
            <div>{props.patientId}</div>
        </Form.Item>

        <Form.Item
            label="Tên bệnh nhân"
            name="patientName"
        >
            <div>{props.patientName}</div>
        </Form.Item>

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
