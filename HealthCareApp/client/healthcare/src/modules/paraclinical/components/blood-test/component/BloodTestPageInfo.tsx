import React, { useRef } from 'react'
import BloodTestForm, { RefObject } from './form/BloodTestForm';
import { ColumnsType } from 'antd/es/table';
import { Row, Col } from 'antd';
import { BasicNotification } from '../../../../../shared/components/BasicNotification';
import { paraclinicalService } from '../../../services/paraclinical.service';

export const BloodTestPageInfo = (props: any) => {
    const child = useRef<RefObject>(null);

    const submitForm = (value: any) => {
        const data = {
            note: value.note,
            paraclinicalDiagnostic: value.note,
            resultSample: value.resultSample,
            patientId: props?.ticket?.patientId,
            staffId: value.staffId,
            typeServiceId: value.typeServiceId,
            staffTicketId: props?.ticket?.id   
        };
        
        paraclinicalService.createParaclinicalReport(data)
            .then(() => {
                BasicNotification(
                    "success",
                    "Success",
                    "Đã lưu báo cáo cận lâm sàng thành công !",
                );
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
    <>
        <Row style={{marginTop: '1rem'}}>
            <Col span={10}>
                <div>
                    <span>Mã bệnh nhân: {props.ticket?.patientId}</span>
                </div>
            </Col>
            <Col span={14}>
                <div>
                    <span>Họ tên bệnh nhân: {props.ticket?.patientName}</span>
                </div>
            </Col>
        </Row>
        <Row style={{marginTop: '1rem'}}>
            <Col span={24}>
                <BloodTestForm ref={child.current?.showForm} submitForm={submitForm} />
            </Col>
        </Row>
    </>
  )
}
