import { Button, Col, Form, Input, Row, Select } from 'antd'
import { useContext } from 'react'
import { WebsocketContext } from '../../../../contexts/WebSocketContext';
import { BasicNotification } from '../../../../shared/components/BasicNotification';
import { staffTicketService } from '../services/staffTicket.service';
import useTypeService from '../../../paraclinical/hooks/useTypeSerivce';
import { StaffTicketTable } from './StaffTicketTable';

export const StaffTicketForm = (props: any) => {
    const socket = useContext(WebsocketContext);
    const [dataTypeService] = useTypeService();

    const handleSubmit = (value: any) => {
        const dataStaffTicket = {
            // staffId: value.staffId,
            patientId: props?.patient?.id,
            note: value.note,
        };
        
        staffTicketService.createStaffTicket(dataStaffTicket)
        .then((res) => {
                const dataStaffTicketDetail = {
                    staffTicketId: res.data?.id,
                    typeServiceId: value.typeService,
                };
                staffTicketService.createStaffTicketDetail(dataStaffTicketDetail)
                    .then(() => {
                        BasicNotification(
                            "success",
                            "Success",
                            "Đã lưu ticket thành công !",
                        );
                        socket.emit('newStaffTicket');
                        socket.emit('newStaffTicketDetail', { to: socket.id, data: dataStaffTicketDetail.staffTicketId })
                    }).catch((e) => console.log(e));
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

    const optionTypeService = dataTypeService.map((typeService, index) => ({
        value: typeService.id,
        label: typeService.serviceName,
    }))

  return (
    <>
        <Row>
            <Col span={12}>
                <Form
                    name="staffticket"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Mã bệnh nhân"
                        name="patientId"
                    >
                        <div>{props?.patient?.id}</div>
                    </Form.Item>

                    <Form.Item
                        label="Tên bệnh nhân"
                        name="patientName"
                    >
                        <div>{props?.patient?.name}</div>
                    </Form.Item>

                    {/* <Form.Item
                        label="Bác sĩ"
                        name="staffId"
                        rules={[{ required: true, message: 'Please input staffId!' }]}
                    >
                        <Input />
                    </Form.Item> */}

                    <Form.Item
                        name="typeService"
                        label="Dịch vụ"
                        rules={[{ required: true, message: `Please input department!` }]}
                    >
                        <Select
                            mode="multiple"
                            showSearch
                            placeholder="Select a department"
                            optionFilterProp="children"
                            options={optionTypeService}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ghi chú"
                        name="note"
                        rules={[{ required: true, message: 'Please input your note!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Lưu Ticket
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={12}>
                <StaffTicketTable />
            </Col>
        </Row>
    </>
  )
}
