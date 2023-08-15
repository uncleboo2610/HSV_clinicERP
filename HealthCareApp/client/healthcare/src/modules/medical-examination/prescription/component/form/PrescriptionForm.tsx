import { Space, Input, Button, Form, InputNumber, Select, FormInstance } from 'antd';
import React, { Ref, forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import useDrug from '../../../../drug/hooks/useDrug';
import { WebsocketContext } from '../../../../../contexts/WebSocketContext';

export interface RefObject {
    showForm: () => void;
}

interface Props {
    submitForm: (value: any) => void
}

export const PrescriptionForm = (props: Props, ref: Ref<RefObject>) => {
    const formRef = React.useRef<FormInstance>(null);
    const socket = useContext(WebsocketContext)
    const [drugData] = useDrug();
    const [prescriptionId, setPresrcriptionId] = useState(null);
    const {submitForm} = props

    function showForm() {}

    const handleSubmitForm = (values: any) => {
        submitForm(values);
    };

    useImperativeHandle(ref, () => ({ showForm }));

    const optionDrug = drugData.map((drug, index) => ({
        value: drug.drugName,
        label: drug.drugName,
    }));
    
    const onReset = () => {
        formRef.current?.resetFields();
    };

  return (
        <Form
            name="complex-form"
            ref={formRef}
            onFinish={handleSubmitForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 900 }}
        >
            <Space.Compact block>
                <Form.Item
                    name='drugName'
                >
                    <Select
                        showSearch
                        style={{ width: '200px' }}
                        placeholder="Drug"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={optionDrug}
                    />
                </Form.Item>
                <Form.Item
                    name='morningDose'
                    noStyle
                >
                    <InputNumber style={{ width: 'calc(100% - 500px)', height: '32px' }} placeholder='Liều sáng' />
                </Form.Item>
                <Form.Item
                    name='afternoonDose'
                    noStyle
                >                
                    <InputNumber style={{ width: 'calc(100% - 500px)', height: '32px' }} placeholder='Liều trưa' />
                </Form.Item>
                <Form.Item
                    name='eveningDose'
                    noStyle
                >                
                    <InputNumber style={{ width: 'calc(100% - 500px)', height: '32px' }} placeholder='Liều tối' />
                </Form.Item>
                <Form.Item
                    name='quantity'
                    noStyle
                >                
                    <InputNumber style={{ width: 'calc(100% - 500px)', height: '32px' }} placeholder='Số lượng' />
                </Form.Item>
                <Form.Item
                    name='note'
                    noStyle
                >                
                    <Input style={{ width: 'calc(100% - 500px)', height: '32px' }} placeholder='Ghi chú' />
                </Form.Item>
                {/* <Button type="primary" htmlType="submit" disabled={prescriptionId ? false : true}> */}
                <Button type="primary" htmlType="submit" >
                    Thêm
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Xóa
                </Button>
            </Space.Compact>
        </Form>
  )
}

export default forwardRef(PrescriptionForm);