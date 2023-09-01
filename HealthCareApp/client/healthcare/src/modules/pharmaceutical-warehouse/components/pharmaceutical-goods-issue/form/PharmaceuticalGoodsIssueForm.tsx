import React, { Ref, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import useTypeDrug from '../../../../drug/hooks/useTypeDrug'
import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
import { ContainerOutlined } from '@ant-design/icons';
import PharmaceuticalGoodsIssueInfoTableForm, { RefObjectTable } from './PharmaceuticalGoodsIssueInfoTableForm';

export interface RefObject {
    showForm: () => void;
}

interface Props {
    submitForm: (value: any) => void
    clearTable: () => void
    onCreatingPharmaceuticalGoodsIssue: (value: any) => void
}

export const PharmaceuticalGoodsIssueForm = (props: Props, ref: Ref<RefObject>) => {
    const child = useRef<RefObjectTable>(null);
    const {submitForm, onCreatingPharmaceuticalGoodsIssue, clearTable} = props;
    const [dataTypeDrug] = useTypeDrug();
    const [form] = Form.useForm();

    function showForm() {}

    useImperativeHandle(ref, () => ({ showForm }));

    const optionTypeDrug = dataTypeDrug.map((typeDrug, index) => ({
        value: typeDrug.typeDrugName,
        label: typeDrug.typeDrugName,
    }));

    const handleSubmitTable = (values: any) => {
        form.setFieldsValue({
            drugId: values.drugId,
            drugName: values.drugName,
            price: values.price,
            unit: values.unit,
            typeDrugName: values.typeDrugName,
            quantity: 0
        });
    }

    const handleSubmitForm = (values: any) => {
        submitForm(values);
    };

    const handleCreatingPharmaceuticalGoodsReceipt = (values: any) => {
        onCreatingPharmaceuticalGoodsIssue(values);
    };

  return (
    <Form
        name="PharmaceuticalGoodsIssue"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmitForm}
        form={form}
    >
        <Form.Item
            label="Tên thuốc"
            name="drugName"
            rules={[{ required: true, message: `Please input drug's name!` }]}
        >
            <Input disabled />
        </Form.Item>

        <Form.Item
            label="Mã thuốc"
            name="drugId"
            rules={[{ required: true, message: `Please input drug's name!` }]}
        >
            <Input disabled />
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
                disabled 
            />
        </Form.Item>

        <Form.Item
            label="Đơn vị tính (ĐVT)"
            name="unit"
            rules={[{ required: true, message: `Please input drug's unit!` }]}
        >
            <Input disabled />
        </Form.Item>

        <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: `Please input drug's price!` }]}
        >
            <InputNumber type='number' disabled />
        </Form.Item>

        <Form.Item
            label="Số lượng xuất kho"
            name="quantity"
            rules={[{ required: true, message: `Please input drug's quantity!` }]}
        >
            <InputNumber type='number' />
        </Form.Item>

        <Space wrap style={{width: '100%', justifyContent: 'center', marginBottom: '24px'}}>
            <Button onClick={handleCreatingPharmaceuticalGoodsReceipt} >
                Xuất kho
            </Button>
            <Button onClick={clearTable}>
                Xóa bảng
            </Button>
            <Form.Item noStyle wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" >
                    Thêm
                </Button>
            </Form.Item>
            <Button     
                type="primary" 
                shape="round"
                icon={<ContainerOutlined />} 
                size={'middle'}
                onClick={() => {
                    child.current?.showTable();
                }}
                
            />
            <PharmaceuticalGoodsIssueInfoTableForm ref={child} submitTable={handleSubmitTable}/>
        </Space>
    </Form>
  )
}

export default forwardRef(PharmaceuticalGoodsIssueForm)