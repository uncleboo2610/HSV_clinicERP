import { Ref, forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import useDepartment from '../../../departments/hooks/useDepartment';

export interface RefObject {
    openModal: (data: any) => void;
}

interface Props {
    submitModalForm: (value: any) => void;
}

export const ModalReceivingCardForm = (props: Props, ref: Ref<RefObject>) => {
    const { submitModalForm } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [dataDepartment] = useDepartment();

    const optionDepartment = dataDepartment.map((dept, index) => ({
        value: dept.id,
        label: dept.departmentName,
    }))

    function closeModal() {
        setIsModalOpen(false);
    };
    
    function openModal(data: any) {
        if (data == null) {
            console.log('no data rh');
        } else {
            form.setFieldsValue(data);
        }
        setIsModalOpen(true);
    };

    useImperativeHandle(ref, () => ({ openModal }));

    const handleSubmit = (values: any) => {
        submitModalForm({
            patientId: values.id,
            patientName: values.name,
            departmentId: values.departmentId,
        });
        closeModal();
    };

  return (
    <>
        <Modal
            title="Member"
            open={isModalOpen}
            onCancel={closeModal}
            footer={null}
        >
            <Form
                name="receivingform"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                form={form}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Mã bệnh nhân"
                    name="id"
                >
                    <Input disabled={true} />
                </Form.Item>

                <Form.Item
                    label="Họ tên"
                    name="name"
                >
                    <Input disabled={true} />
                </Form.Item>

                <Form.Item
                    label="Khoa"
                    name="departmentId"
                    rules={[{ required: true, message: 'Please input department!' }]}
                >
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        options={optionDepartment}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Lấy thẻ
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
  )
}

export default forwardRef(ModalReceivingCardForm)