import { Button, Form, Input } from 'antd'
import React, { useContext } from 'react'
import { WebsocketContext } from '../../../../../contexts/WebSocketContext';
import { BasicNotification } from '../../../../../shared/components/BasicNotification';
import { staffService } from '../../../../staff/services/staff.service';

export const StaffTicketForm = (props: any) => {
    const socket = useContext(WebsocketContext);
    const handleSubmit = (value: any) => {
        const data = {
            // staffId: value.staffId,
            note: value.note,
            patientId: props?.patient?.patientId,
        };
        staffService.createStaffTicket(data)
            .then(() => {
                BasicNotification(
                    "success",
                    "Success",
                    "Đã lưu giấy khám bệnh thành công !",
                );
                socket.emit('newStaffTicket')
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
            <div>{props?.patient?.patientId}</div>
        </Form.Item>

        <Form.Item
            label="Tên bệnh nhân"
            name="patientName"
        >
            <div>{props?.patient?.patientName}</div>
        </Form.Item>

        {/* <Form.Item
            label="Bác sĩ"
            name="staffId"
            rules={[{ required: true, message: 'Please input staffId!' }]}
        >
            <Input />
        </Form.Item> */}

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
  )
}
