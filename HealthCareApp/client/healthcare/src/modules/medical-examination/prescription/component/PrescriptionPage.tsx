import React, { useContext, useEffect, useRef, useState } from 'react'
import { PrescriptionForm } from './form/PrescriptionForm'
import { Button, Col, Divider, Modal, Row, Space, Table, Upload } from 'antd'
import { IPrescriptionDetail } from '../models';
import { ColumnsType } from 'antd/es/table';
import { prescriptionService } from '../services/prescription.service';
import { UploadOutlined } from '@ant-design/icons';
import { BasicNotification } from '../../../../shared/components/BasicNotification';
import { PrescriptionPdfForm } from './form/PrescriptionPdfForm';
import { useReactToPrint } from 'react-to-print';
import usePrescriptionDetail from '../hook/usePrescriptionDetail';
import { WebsocketContext } from '../../../../contexts/WebSocketContext';
import useMedicalReport from '../../medical-report/hooks/useMedicalReport';

export interface IMedicalReport {
    id: string;
    patientId: string;
    patientName: string
    diagnostic: string;
    reExaminationDate: Date;
}

export const PrescriptionPage = (props: any) => {
    const [presrcriptionId, setPresrcriptionId] = useState();
    const [medicalReport, setMedicalReport] = useState<IMedicalReport>();
    const [ data, patient ] = usePrescriptionDetail();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [medicalReportData] = useMedicalReport();

    const componentPDF = useRef(null);
    const generatePDF = useReactToPrint({
      content: () => componentPDF.current,
      documentTitle: "Toa",
    });

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        generatePDF()
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columnsPrescriptionDetail: ColumnsType<IPrescriptionDetail> = [
        {
            title: 'STT',
            width: 50,
            dataIndex: 'key',
            key: 'key',
        },
        {
          title: 'Tên thuốc',
          dataIndex: 'drugName',
          key: 'drugName',
        },
        {
          title: 'Liều sáng',
          dataIndex: 'morningDose',
          key: 'morningDose'
        },
        {
            title: 'Liều trưa',
            dataIndex: 'afternoonDose',
            key: 'afternoonDose'
        },
        {
            title: 'Liều tối',
            dataIndex: 'eveningDose',
            key: 'eveningDose'
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note'
        }
    ];

    const dataPrescriptionDetail: IPrescriptionDetail[] = data?.map((prescriptionDetail: any, i) => ({
        key: i + 1,
        id: prescriptionDetail?.id,
        drugName: prescriptionDetail?.drug.drugName,
        drugId: prescriptionDetail?.drugId,
        morningDose: prescriptionDetail?.morningDose,
        afternoonDose: prescriptionDetail?.afternoonDose,
        eveningDose: prescriptionDetail?.eveningDose,
        quantity: prescriptionDetail?.quantity,
        note: prescriptionDetail?.note
    }));

    const onCreatingPrescription = () => {
        prescriptionService.createPrescription({
            patientId: medicalReport?.patientId,
            medicalReportId: medicalReport?.id
        })
            .then((e :any) => {
                BasicNotification(
                    "success",
                    "Success",
                    "Đã tạo mã thành công !",
                );
                setPresrcriptionId(e.data.id)
            })
            .catch((e: any) => {
                BasicNotification(
                    "error",
                    "Error",
                    "Fail !",
                );
                console.log(e)
            })
    }

    const columnsMedicalReport: ColumnsType<IMedicalReport> = [
        {
            title: 'STT',
            width: 50,
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Mã bệnh nhân',
            dataIndex: 'patientId',
            key: 'patientId',
        },
        {
            title: 'Tên bệnh nhân',
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
          title: 'Chẩn đoán',
          dataIndex: 'diagnostic',
          key: 'diagnostic',
        },
        {
            title: 'Ngày tái khám',
            dataIndex: 'reExaminationDate',
            key: 'reExaminationDate',
        }
    ];
      
    const dataMedicalReport: IMedicalReport[] = medicalReportData?.map((medicalReport: any, i) => ({
        key: i + 1,
        id: medicalReport.id,
        patientId: medicalReport?.patient?.id,
        patientName: medicalReport?.patient?.name,
        diagnostic: medicalReport.diagnostic,
        reExaminationDate: medicalReport.reExaminationDate
    }))

    const rowSelectionMedicalReport = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IMedicalReport[]) => {
            selectedRows.map((m: any) => {
                setMedicalReport(m);
            });
        },
    };

  return (
    <>
        <Row>
            <Col span={'16'}>
                <Table
                    rowSelection={{
                        type: 'radio',
                        ...rowSelectionMedicalReport,
                    }}
                    columns={columnsMedicalReport}
                    dataSource={dataMedicalReport}
                    size='small'
                />
                
                <Divider />
            </Col>
        </Row>
        <Row>
            <Space>
                <Button type="primary" onClick={onCreatingPrescription}>Tạo toa thuốc</Button>
                <>
                    <Button icon={<UploadOutlined />} onClick={showModal}>In toa</Button>
                    <Modal style={{minWidth: '1300px'}} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <div ref={componentPDF}>
                            <PrescriptionPdfForm prescription={data} patient={patient} medicalReport={medicalReport}/>
                        </div>
                    </Modal>
                </>
            </Space>
        </Row>
        <Row style={{marginTop: '1rem'}}>
            <Col span={10}>
                <div>
                    <span>Mã bệnh nhân: {medicalReport?.patientId}</span>
                </div>
            </Col>
            <Col span={14}>
                <div>
                    <span>Họ tên bệnh nhân: {medicalReport?.patientName}</span>
                </div>
            </Col>
        </Row>
        <Row style={{marginTop: '1rem'}}>
            <PrescriptionForm id={presrcriptionId} />
        </Row>
        <Divider />
        <Row style={{marginTop: '1rem'}}>
            <Table
                columns={columnsPrescriptionDetail}
                dataSource={dataPrescriptionDetail}
                style={{minWidth: '900px'}}
            />
        </Row>
    </>
  )
}
