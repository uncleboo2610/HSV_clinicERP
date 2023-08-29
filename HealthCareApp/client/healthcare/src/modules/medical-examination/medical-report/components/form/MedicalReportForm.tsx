import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd'
import { BasicNotification } from '../../../../../shared/components/BasicNotification';
import { medicalExaminationService } from '../../services/medical-examination.service';
import { Ref, forwardRef, useContext, useImperativeHandle } from 'react';
import { WebsocketContext } from '../../../../../contexts/WebSocketContext';
import useTypeSolution from '../../hooks/useTypeSolution';

export interface RefObjectMR {
    openForm: (data: any) => void;
}

interface Props {
    submitModalForm: (value: any) => void;
}

export const MedicalReportForm = (props: Props, ref: Ref<RefObjectMR>) => {
    const { submitModalForm } = props;
    const [data] = useTypeSolution();

    const openForm = () => {}

    useImperativeHandle(ref, () => ({ openForm }));

    const handleSubmit = (values: any) => {
        submitModalForm(values);
    };

    const optionTypeSolution = data.map((typeSolution, index) => ({
        value: typeSolution.id,
        label: typeSolution.solutionName,
    }));

  return (
    <Form
        name="medicalexamination-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
    >
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

        <Form.Item
            name="typeSolutionId"
            label="Cách giải quyết"
            rules={[{ required: true, message: `Please input a service!` }]}
        >
            <Select
                mode="multiple"
                showSearch
                placeholder="Select a solutiond"
                optionFilterProp="children"
                options={optionTypeSolution}
            />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Lưu báo cáo khám bệnh
            </Button>
        </Form.Item>
    </Form>
  )
}

export default forwardRef(MedicalReportForm)