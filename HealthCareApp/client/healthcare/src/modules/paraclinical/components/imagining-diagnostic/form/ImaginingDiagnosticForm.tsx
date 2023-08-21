import { Button, Form, Input, Select } from 'antd';
import useTypeService from '../../../hooks/useTypeSerivce';
import { paraclinicalService } from '../../../services/paraclinical.service';
import { BasicNotification } from '../../../../../shared/components/BasicNotification';
import { Ref, forwardRef, useImperativeHandle } from 'react';

export interface RefObject {
    showForm: () => void;
}

interface Props {
    submitForm: (value: any) => void
}

export const ImaginingDiagnosticForm = (props: Props, ref: Ref<RefObject>) => {
    const {submitForm} = props
    const [dataTypeService] = useTypeService();

    function showForm() {}

    useImperativeHandle(ref, () => ({ showForm }));

    const optionTypeService = dataTypeService.map((service, index) => ({
        value: service.id,
        label: service.serviceName,
    }));

    const handleSubmitForm = (values: any) => {
        submitForm(values);
    };

    // const handleSubmit = (value: any) => {
    //     const data = {
    //         note: value.note,
    //         paraclinicalDiagnostic: value.note,
    //         resultSample: value.resultSample,
    //         staffId: value.staffId,
    //         typeServiceId: value.typeServiceId,
    //         staffTicketId: props.ticket.id   
    //     };

    //     paraclinicalService.createParaclinicalReport(data)
    //         .then(() => {
    //             BasicNotification(
    //                 "success",
    //                 "Success",
    //                 "Đã lưu báo cáo cận lâm sàng thành công !",
    //             )
    //         })
    //         .catch((e) => {
    //             BasicNotification(
    //                 "error",
    //                 "Error",
    //                 "Failed to update data !",
    //             );
    //             console.log(e);
    //         });
    // };

  return (
    <Form
        name="imagingdiagnostic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmitForm}
    >
        <Form.Item
            label="Loại dịch vụ"
            name="typeServiceId"
            rules={[{ required: true, message: 'Please input type of service!' }]}
        >
            <Select
                showSearch
                placeholder="Select a service"
                optionFilterProp="children"
                options={optionTypeService}
            />
        </Form.Item>

        <Form.Item
            label="Nhân viên kỹ thuật"
            name="staffId"
            rules={[{ required: true, message: 'Please input staffId!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Chuẩn đoán cận lâm sàng"
            name="paraclinicalDiagnostic"
            rules={[{ required: true, message: 'Please input your diagnostic!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Ghi chú"
            name="note"
            rules={[{ required: true, message: 'Please input note!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Kết quả"
            name="resultSample"
            rules={[{ required: true, message: 'Please input result samples!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Lưu báo cáo khám bệnh
            </Button>
        </Form.Item>
    </Form>
  )
}

export default forwardRef(ImaginingDiagnosticForm);