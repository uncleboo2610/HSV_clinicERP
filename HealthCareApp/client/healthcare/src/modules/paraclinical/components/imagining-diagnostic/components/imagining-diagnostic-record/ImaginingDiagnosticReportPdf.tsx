import { Row, Col, Table, Space, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import { IImaginingDiagnosticImage, IImaginingDiagnosticRecord } from '../../../../models';

export const ImaginingDiagnosticReportPdf = (props: any) => {
    const [paraclinicalReport, setParaclinicalReport] = useState<IImaginingDiagnosticRecord>();
    const [dataImage, setDataImage] = useState<IImaginingDiagnosticImage[]>([]);

    useEffect(() => {
        setParaclinicalReport(props.paraclinicalReport);
        setDataImage(props.dataImage);
    }, [props]);

  return (
    <>
        <div style={{padding: '50px'}}>
            <Row style={{marginTop: '1rem'}}>
                <Col span={10}>
                    <div>
                        <span>Họ tên bệnh nhân: {paraclinicalReport?.patientName}</span>
                    </div>
                </Col>
                <Col span={14}>
                    <div>
                        <span>Tên bác sĩ: {paraclinicalReport?.staffName}</span>
                    </div>
                </Col>
                <Col span={24}>
                    <div>
                        <span>Chẩn đoán: {paraclinicalReport?.paraclinicalDiagnostic}</span>
                    </div>
                </Col>
                <Col span={24}>
                    <div>
                        <span>Ghi chú: {paraclinicalReport?.note}</span>
                    </div>
                </Col>

                <Col span={24}>
                    <div>
                        <span>Ngày tạo: {paraclinicalReport?.createdAt}</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <>
                    <Space size={[8, 10]} wrap>
                        {dataImage.map((image, i) => 
                            <div key={i}>
                                <Image
                                    width={200}
                                    src={image.imageUrl}
                                />
                            </div>
                        )}
                    </Space>
                </>
            </Row>
        </div>
    </>
  )
}
