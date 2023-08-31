import React, { Ref, forwardRef, useImperativeHandle } from 'react'
import useTypeDrug from '../../../../drug/hooks/useTypeDrug'
import { Button, Form, Input, InputNumber, Select } from 'antd';

export interface RefObject {
    showForm: () => void;
}

interface Props {
    submitForm: (value: any) => void
}

export const PharmaceuticalGoodsReceiptForm = (props: Props, ref: Ref<RefObject>) => {
    const {submitForm} = props;
    const [dataTypeDrug] = useTypeDrug();

    function showForm() {}

    useImperativeHandle(ref, () => ({ showForm }));

    const optionTypeDrug = dataTypeDrug.map((typeDrug, index) => ({
        value: typeDrug.typeDrugName,
        label: typeDrug.typeDrugName,
    }));

    const handleSubmitForm = (values: any) => {
        submitForm(values);
    };

  return (
    <Form
        name="PharmaceuticalGoodsReceived"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmitForm}
    >
        <Form.Item
            label="Tên thuốc"
            name="drugName"
            rules={[{ required: true, message: `Please input drug's name!` }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Loại Thuốc"
            name="typeDrugName"
            rules={[{ required: true, message: 'Please input type of drug!' }]}
        >
            <Select
                showSearch
                optionFilterProp="children"
                options={optionTypeDrug}
            />
        </Form.Item>

        <Form.Item
            label="Đơn vị tính (ĐVT)"
            name="unit"
            rules={[{ required: true, message: `Please input drug's unit!` }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: `Please input drug's price!` }]}
        >
            <InputNumber type='number' />
        </Form.Item>

        <Form.Item
            label="Số lượng nhập kho"
            name="quantity"
            rules={[{ required: true, message: `Please input drug's quantity!` }]}
        >
            <InputNumber type='number' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Thêm
            </Button>
        </Form.Item>
    </Form>
  )
}

export default forwardRef(PharmaceuticalGoodsReceiptForm)