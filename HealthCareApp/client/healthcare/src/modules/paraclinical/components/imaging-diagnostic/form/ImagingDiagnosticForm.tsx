import { Button, Form, Input, Select } from 'antd';
import useTypeService from '../../../hooks/useTypeSerivce';
import { paraclinicalService } from '../../../services/paraclinical.service';
import { BasicNotification } from '../../../../../shared/components/BasicNotification';

export const ImagingDiagnosticForm = (props: any) => {
    const [dataTypeService] = useTypeService();

    const optionTypeService = dataTypeService.map((service, index) => ({
        value: service.id,
        label: service.serviceName,
    }));

    const handleSubmit = (value: any) => {
        const data = {
            note: value.note,
            paraclinicalDiagnostic: value.note,
            resultSample: value.resultSample,
            staffId: value.staffId,
            typeServiceId: value.typeServiceId,
            staffTicketId: props.ticket.id   
        };

        paraclinicalService.createParaclinical(data)
            .then(() => {
                BasicNotification(
                    "success",
                    "Success",
                    "Đã lưu báo cáo cận lâm sàng thành công !",
                )
            })
            .catch((e) => {
                BasicNotification(
                    "error",
                    "Error",
                    "Failed to update data !",
                );
                console.log(e);
            });
    };

  return (
    <Form
        name="imagingdiagnostic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
    >
        <Form.Item
            label="Mã bệnh nhân"
            name="patientId"
        >
            <div>{props?.ticket?.patientId}</div>
        </Form.Item>

        <Form.Item
            label="Tên bệnh nhân"
            name="patientName"
        >
            <div>{props?.ticket?.patientName}</div>
        </Form.Item>

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
