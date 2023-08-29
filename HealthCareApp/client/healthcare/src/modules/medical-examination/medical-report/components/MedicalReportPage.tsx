import { Button, Card, Col, Row, Table } from 'antd'
import React, { useRef, useState } from 'react'
import IcdTable, { RefObject } from '../../../icd/components/IcdTable';
import MedicalReportForm, { RefObjectMR } from './form/MedicalReportForm';
import { socket } from '../../../../contexts/WebSocketContext';
import { BasicNotification } from '../../../../shared/components/BasicNotification';
import { medicalExaminationService } from '../services/medical-examination.service';
import { IIcd } from '../../../icd/models';
import { useMedicalReportFormTableColumn } from './form/MedicalReportFormTable.column';
import ComorbidityIcdTable, { RefObjectComorbidityIcd } from '../../../icd/components/ComorbidityIcdTable';

export const MedicalReportPage = (props: any) => {
    const childIcd = useRef<RefObject>(null);
    const childComorbidityIcd = useRef<RefObjectComorbidityIcd>(null);
    const childMR = useRef<RefObjectMR>(null);
    const [icd, setIcd] = useState<IIcd>();
    const [dataComorbidity, setDataComorbidity] = useState<IIcd[]>([]);
    const [dataComorbidityId, setDataComorbidityId] = useState<string[]>([]);

    const comorbidityTableResult = useMedicalReportFormTableColumn();

    const onCheckICD = (values: any) => {
        setIcd(values)
    };

    const onCheckComorbidityICD = (values: any) => {
        setDataComorbidity([...dataComorbidity, values])
    };

    const handleSubmitMedicalReport = (value: any) => {
        const data = {
            patientId: props?.patient?.id,
            staffId: value.staffId,
            diagnostic: value.diagnostic,
            reExaminationDate: value.reExaminationDate,
            typeSolutionId: value.typeSolutionId,
            diseaseIcd: icd?.dmIcdMaIcd,
            comorbidityId: dataComorbidityId
        };
        medicalExaminationService.createMedicalExamination(data)
            .then((e) => {
                socket.emit('newMedicalReport', { to: socket.id });
                BasicNotification(
                    "success",
                    "Success",
                    "Đã lưu giấy khám bệnh thành công !",
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

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IIcd[]) => {
            selectedRows.map((icd) => {
                setDataComorbidityId([...dataComorbidityId, icd.dmIcdMaIcd]);
            });
        },
    };
    
  return (
    <Row>
        <Col span={12}>
            <Row style={{marginTop: '1rem', marginBottom: '1rem'}}>
                <Col span={14}>
                    <div>
                        <span>Mã bệnh nhân: {props?.patient?.id}</span>
                    </div>
                </Col>
                <Col span={10}>
                    <div>
                        <span>Họ tên bệnh nhân: {props?.patient?.name}</span>
                    </div>
                </Col>
            </Row>
            <MedicalReportForm ref={childMR} submitModalForm={handleSubmitMedicalReport}/>
        </Col>
        <Col span={12}>
            <Row>
                <Card style={{ width: '100%' }}>
                    <div>
                        <span>Mã ICD: {icd?.dmIcdIcdId}</span>
                    </div>
                    <div>
                        <span>Tên bệnh chính: {icd?.dmIcdTenIcd}</span>
                    </div>
                    <>
                        <Button
                            onClick={() => {
                                childIcd.current?.openModal(childIcd);
                            }}
                        >
                            Chọn bệnh chính
                        </Button>
                        <IcdTable ref={childIcd} submitModalForm={onCheckICD} />
                    </>
                </Card>
            </Row>
            <Row>
                <Col span={24}>
                    <>
                        <Button
                            onClick={() => {
                                childComorbidityIcd.current?.openModal(childComorbidityIcd);
                            }}
                            type='primary'
                        >
                            Chọn bệnh kèm theo
                        </Button>
                        <ComorbidityIcdTable ref={childComorbidityIcd} submitModalForm={onCheckComorbidityICD} />
                    </>
                    <Button
                        onClick={() => setDataComorbidity([])}
                    >
                        Reset
                    </Button>
                </Col>
                <Col span={24}>
                    <Table
                        rowSelection={{
                            ...rowSelection,
                        }}
                        columns={comorbidityTableResult["columns"]}
                        dataSource={dataComorbidity}
                    />
                </Col>
            </Row>
        </Col>
    </Row>
  )
}
