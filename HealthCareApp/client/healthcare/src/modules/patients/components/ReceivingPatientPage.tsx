import type { CascaderProps } from 'antd';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
} from 'antd';
import { patientsService } from '../services/patients.service';
import { BasicNotification } from '../../../shared/components/BasicNotification';
import useDepartment from '../../departments/hooks/useDepartment';
import { useContext } from 'react';
import { WebsocketContext } from '../../../contexts/WebSocketContext';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
        span: 24,
        offset: 0,
        },
        sm: {
        span: 16,
        offset: 8,
        },
    },
};

export const ReceivingPatientPage = () => {
    const [form] = Form.useForm();
    const [dataDepartment] = useDepartment();
    const socket = useContext(WebsocketContext);

    const optionDepartment = dataDepartment.map((dept, index) => ({
        value: dept.id,
        label: dept.departmentName,
    }))

    const onFinish = (values: any) => {
        const patientPayload = {
            name: values.name,
            dob: values.dob,
            idCard: parseInt(values.idCard),
            address: values.address,
            gender: values.gender,
            phone: parseInt(values.prefix + values.phone),
            pob: values.pob,
            job: values.job,
        };
        
        patientsService.createPatient(patientPayload)
            .then((resPatient) => {
                patientsService.createReceivingCard({
                    patientId: resPatient.data.id,
                    patientName: values.name
                }).then((resReceivingCard) => {
                    patientsService.createReceivingCardDetail({
                        patientId: resReceivingCard.data.patient.id,
                        receivingCardId: resReceivingCard.data.id,
                        departmentId: values.departmentId
                    }).then(() => {
                        BasicNotification(
                            "success",
                            "Success",
                            "Đã đăng kí tiếp nhận bệnh nhân thành công !",
                        );
                        socket.emit('newReceiving')
                        socket.emit('newPatient')
                    }).catch((e) => {
                        BasicNotification(
                            "error",
                            "Error",
                            "Failed to update data !",
                        );
                        console.log(e);
                    });
                }).catch((e) => {
                    BasicNotification(
                        "error",
                        "Error",
                        "Failed to update data !",
                    );
                    console.log(e);
                });

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

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="84">+84</Option>
            </Select>
        </Form.Item>
    );

  return (
    <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 900 }}
        scrollToFirstError
    > 
        <Row>
            <Col span={12}>
                <Form.Item
                    name="name"
                    label="Họ tên"
                    rules={[
                        {
                            required: true,
                            message: `Please input patient's name!`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[{ required: true, message: `Please input patient's address!`, whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: `Please input patient's phone number!` }]}
                    hasFeedback
                >
                    <InputNumber addonBefore={prefixSelector} style={{ width: '100%' }} type='number' />
                </Form.Item>

                <Form.Item
                    name="pob"
                    label="Nơi sinh"
                    rules={[{ required: true, message: `Please input patient's place of birth!` }]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="idCard"
                    label="CCCD/CMND"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Id number!',
                    },
                    ]}
                    hasFeedback
                >
                    <InputNumber type='number' />
                </Form.Item>
            </Col>
            <Col span={12} >
                <Form.Item
                    name="job"
                    label="Công việc"
                    rules={[{ required: true, message: `Please input patient's job!` }]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="dob"
                    label="Ngày sinh"
                    rules={[{ required: true, message: `Please chosoe patient's date of birth!` }]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Giới tính"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                >
                    <Select placeholder="Select your gender">
                        <Option value="Nam">Nam</Option>
                        <Option value="Nữ">Nữ</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="departmentId"
                    label="Khoa khám bệnh"
                    rules={[{ required: true, message: `Please input department!` }]}
                >
                    <Select
                        showSearch
                        placeholder="Select a department"
                        optionFilterProp="children"
                        options={optionDepartment}
                    />
                </Form.Item>
            </Col>
        </Row>

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Đăng ký
            </Button>
        </Form.Item>
    </Form>
    );
};