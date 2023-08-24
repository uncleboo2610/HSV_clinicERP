import { Space, Input, Button, Form, InputNumber, Select, FormInstance, Modal, Table } from 'antd';
import React, { Ref, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import useMedicineStorage from '../../../../medicine-storage/hooks/useMedicineStorage';
import { IMedicineStorage } from '../../models';
import { ColumnsType } from 'antd/es/table';
import '../../styles/styles.css';

export interface RefObject {
    showForm: () => void;
}

interface Props {
    submitForm: (value: any) => void
    typePrescription: boolean
}

export const PrescriptionForm = (props: Props, ref: Ref<RefObject>) => {
    const formRef = useRef<FormInstance>(null);
    const [medicineStorageData] = useMedicineStorage();
    const [drugName, setDrugName] = useState<any>()
    const {submitForm, typePrescription} = props;

    function showForm() {}

    const handleSubmitForm = (values: any) => {
        const data = {
            note: values.note,
            drugName: drugName,
            morningDose: values.morningDose,
            afternoonDose: values.afternoonDose,
            eveningDose: values.eveningDose,
            quantity: values.quantity,
        }
        submitForm(data);
    };

    useImperativeHandle(ref, () => ({ showForm }));

    // const optionDrug = drugData.map((drug, index) => ({
    //     value: drug.drugName,
    //     label: drug.drugName,
    // }));
    
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

    const columnsMedicineStorage: ColumnsType<IMedicineStorage> = [
        {
            title: 'Mã thuốc',
            dataIndex: 'drugId',
            key: 'drugId',
        },
        {
            title: 'Tên thuốc',
            dataIndex: 'drugName',
            key: 'drugName',
        },
        {
          title: 'Loại thuốc',
          dataIndex: 'typeDrugName',
          key: 'typeDrugName',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        }
    ];
      
    const dataMedicineStorage: IMedicineStorage[] = medicineStorageData?.map((medicine: any, i) => ({
        key: i + 1,
        id: medicine.id,
        drugId: medicine?.drug?.id,
        drugName: medicine?.drug?.drugName,
        typeDrugId: medicine?.drug?.typeDrug?.id,
        typeDrugName: medicine?.drug?.typeDrug?.typeDrugName,
        quantity: medicine.quantity,
    }))

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        // onChange: (selectedRowKeys: React.Key[], selectedRows: IReceivingCardDetail[]) => {
        //     selectedRows.map((p: any) => {
        //         // setPatient(p)
        //     });
        // },
    };

    const checkPrescription = (record: IMedicineStorage, i: any) => {
        console.log(typePrescription)
        if (typePrescription) {
            if (record.typeDrugId === 1) {
                return 'disabled-row'
            } else {
                return ''
            }
        } else {
            if (record.typeDrugId === 2) {
                return 'disabled-row'
            } else {
                return ''
            }
        }
    }

  return (
        <Form
            name="form"
            ref={formRef}
            onFinish={handleSubmitForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 900 }}
        >
            <Space direction="horizontal" style={{marginBottom: '1rem'}}>
                <Input style={{ width: '200px' }} placeholder='Tên thuốc' value={drugName}/>
                <>
                    <Button style={{marginLeft: '1rem'}} onClick={showModal}>
                        Xem thuốc
                    </Button>
                    <Modal title="Kho thuốc" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Table
                            columns={columnsMedicineStorage}
                            dataSource={dataMedicineStorage}
                            size='small'
                            rowClassName={checkPrescription}
                            onRow={(record, rowIndex) => {
                                return {
                                onDoubleClick: event => {
                                    setDrugName(record.drugName);
                                    handleCancel();
                                }, // double click row
                            }}}
                        />
                    </Modal>
                </>
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