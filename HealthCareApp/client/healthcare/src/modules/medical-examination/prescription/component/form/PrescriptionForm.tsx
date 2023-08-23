import { Space, Input, Button, Form, InputNumber, Select, FormInstance, Modal, Table } from 'antd';
import React, { Ref, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import useDrug from '../../../../drug/hooks/useDrug';
import useMedicineStorage from '../../../../medical-storage/hooks/useMedicineStorage';

export interface RefObject {
    showForm: () => void;
}

interface Props {
    submitForm: (value: any) => void
}

export const PrescriptionForm = (props: Props, ref: Ref<RefObject>) => {
    const formRef = useRef<FormInstance>(null);
    const [medicineStorageData] = useMedicineStorage();
    const [drugData] = useDrug();
    const {submitForm} = props

    console.log(medicineStorageData)

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        // onChange: (selectedRowKeys: React.Key[], selectedRows: IReceivingCardDetail[]) => {
        //     selectedRows.map((p: any) => {
        //         // setPatient(p)
        //     });
        // },
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
            <Space direction="horizontal" style={{marginBottom: '1rem'}}>
                <Form.Item
                    name='drugName'
                    noStyle
                >
                    <Input style={{ width: '200px' }} placeholder='Ghi chú' value={'123'}/>
                    <>
                        <Button style={{marginLeft: '1rem'}} onClick={showModal}>
                            Xem thuốc
                        </Button>
                        <Modal title="Kho thuốc" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Table
                                rowSelection={{
                                    type: 'radio',
                                    ...rowSelection,
                                }}
                                // columns={resultTable['columns']}
                                // dataSource={resultTable['data']}
                                size='small'
                            />
                        </Modal>
                    </>
                </Form.Item>
            </Space>
            <Space.Compact block>
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