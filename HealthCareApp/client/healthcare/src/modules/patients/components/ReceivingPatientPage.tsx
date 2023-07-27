import type { CascaderProps } from 'antd';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
} from 'antd';
import { patientsService } from '../services/patients.service';

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

    const onFinish = (values: any) => {
        const data = {
            name: values.name,
            dob: values.dob,
            idCard: parseInt(values.idCard),
            address: values.address,
            gender: values.gender,
            phone: parseInt(values.prefix + values.phone),
            pob: values.pob,
            job: values.job,
        }
        
        patientsService.createPatient(data).then().catch((e) => console.log(e));
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
        style={{ maxWidth: 600 }}
        scrollToFirstError
    >
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
            <Select placeholder="select your gender">
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
            </Select>
        </Form.Item>

        {/* <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
            {
                validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
            ]}
            {...tailFormItemLayout}
        >
            <Checkbox>
            I have read the <a href="">agreement</a>
            </Checkbox>
        </Form.Item> */}

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Đăng ký
            </Button>
        </Form.Item>
    </Form>
    );
};