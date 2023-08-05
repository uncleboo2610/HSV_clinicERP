import { Space, Input, Button, Form, InputNumber, Select } from 'antd';
import React, { useState } from 'react';
import useDrug from '../../../../drug/hooks/useDrug';

export const PrescriptionForm = () => {
    const [drugData] = useDrug();

    const onFinish = (e: any) => {
        console.log(e)
    };

    const optionDrug = drugData.map((drug, index) => ({
        value: drug.id,
        label: drug.drugName,
    }));

  return (
    <>
        <Form
            name="complex-form"
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 900 }}
        >
            <Space.Compact block>
                <Select
                    showSearch
                    style={{ width: 700 }}
                    placeholder="Drug"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={optionDrug}
                />
                <Form.Item
                    name='morningDose'
                    noStyle
                >
                    <InputNumber style={{ width: 'calc(100% - 400px)' }} placeholder='Liều sáng' />
                </Form.Item>
                <Form.Item
                    name='afternoonDose'
                    noStyle
                >                
                    <InputNumber style={{ width: 'calc(100% - 400px)' }} placeholder='Liều trưa' />
                </Form.Item>
                <Form.Item
                    name='eveningDose'
                    noStyle
                >                
                    <InputNumber style={{ width: 'calc(100% - 400px)' }} placeholder='Liều tối' />
                </Form.Item>
                <Form.Item
                    name='note'
                    noStyle
                >                
                    <Input style={{ width: 'calc(100% - 200px)' }} placeholder='Ghi chú' />
                </Form.Item>
                <Button type="primary" htmlType="submit">Thêm</Button>
            </Space.Compact>
        </Form>
    </>
  )
}
