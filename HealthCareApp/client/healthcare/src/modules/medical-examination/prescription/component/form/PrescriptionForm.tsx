import { Space, Input, Button, Form, InputNumber, Select, FormInstance } from 'antd';
import React, { Ref, forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import useDrug from '../../../../drug/hooks/useDrug';
import { prescriptionService } from '../../services/prescription.service';
import { WebsocketContext } from '../../../../../contexts/WebSocketContext';
import { BasicNotification } from '../../../../../shared/components/BasicNotification';

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

    function showForm() {
        console.log('ok');
    }

    const handleSubmitForm = (values: any) => {
        submitForm(values);
    };

    useImperativeHandle(ref, () => ({ showForm }));

    // useEffect(() => {
    //     setPresrcriptionId(props.id);
    // }, [props.id])

    const optionDrug = drugData.map((drug, index) => ({
        value: drug.id,
        label: drug.drugName,
    }));
    
    const onReset = () => {
        formRef.current?.resetFields();
    };

    const onFinish = (value: any) => {
        const data = {
            morningDose: value.morningDose,
            afternoonDose: value.afternoonDose,
            eveningDose: value.eveningDose,
            quantity: value.quantity,
            note: value.note,
            drugId: value.drugId,
            prescriptionId: prescriptionId
        }
        prescriptionService.createPrescriptionDetail(data)
            .then(() => {
                socket.emit('newPrescriptionDetail', {to: socket.id, data: prescriptionId})
                formRef.current?.resetFields();
            })
            .catch((e) => {
                BasicNotification(
                    "error",
                    "Error",
                    "Fail !",
                );
                console.log(e);
            })
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
                    name='drugId'
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