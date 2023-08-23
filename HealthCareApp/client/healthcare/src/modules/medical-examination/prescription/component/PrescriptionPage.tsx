import React, { useRef, useState } from 'react'
import { Button, Col, Divider, Modal, Row, Space, Table, Upload } from 'antd'
import { IPrescriptionDetail } from '../models';
import { prescriptionService } from '../services/prescription.service';
import { UploadOutlined } from '@ant-design/icons';
import { BasicNotification } from '../../../../shared/components/BasicNotification';
import { PrescriptionPdfForm } from './form/PrescriptionPdfForm';
import { useReactToPrint } from 'react-to-print';
import PrescriptionForm, { RefObject } from './form/PrescriptionForm';
import { usePrescriptionMedicalReportTableColumn } from './PrescriptionMedicalReportTable.column';
import { usePrescriptionDetailTableColumn } from './PrescriptionDetailTable.column';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';

export interface IMedicalReport {
    id: string;
    patientId: string;
    patientName: string
    diagnostic: string;
    reExaminationDate: Date;
}

export const PrescriptionPage = (props: any) => {
    const [dataPrescriptionId, setDataPrescriptionId] = useState<number>(0);
    const [dataPrescription, setDataPrescription] = useState();
    const [patient, setPatient] = useState();
    const [typePrescription, setTypePrescription] = useState<boolean>(false);
    const [count, setCount] = useState(0);
    const [drug, setDrug] = useState<IPrescriptionDetail[]>([])
    const [medicalReport, setMedicalReport] = useState<IMedicalReport>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ dataPrescriptionDetail, setDataPrescriptionDetail ] = useState<IPrescriptionDetail[]>([]);
    
    const child = useRef<RefObject>(null);
    const medicalReportTableResult = usePrescriptionMedicalReportTableColumn();
    const prescriptionDetailTableResult = usePrescriptionDetailTableColumn();


    const componentPDF = useRef(null);
    const generatePDF = useReactToPrint({
      content: () => componentPDF.current,
      documentTitle: "Toa",
    });

    const showModal = () => {
        setIsModalOpen(true);
        prescriptionService.getPrescriptionById(dataPrescriptionId)
            .then((e) => {
                setDataPrescription(e.data.prescriptionDetail);
                setPatient(e.data.patient);
            })
            .catch((e) => console.log(e))
    };

    const onCreatingPrescription = () => {
        prescriptionService.createPrescription({
            patientId: medicalReport?.patientId,
            medicalReportId: medicalReport?.id,
            typePrescriptionId: !typePrescription ? 1 : 2 
        })
        .then((e :any) => {
            setDataPrescriptionId(e.data.id);
            prescriptionService.createPrescriptionDetail({
                prescriptionId: e.data.id,
                drug: drug
            })
            .then((res) => {
                        BasicNotification(
                            "success",
                            "Success",
                            "Đã tạo toa thuốc thành công !",
                        );
                        setDataPrescriptionDetail([]);
                    }).catch((e) => console.log(e))
            })
            .catch((e: any) => {
                BasicNotification(
                    "error",
                    "Error",
                    "Fail !",
                );
                console.log(e)
            });
    };

    const rowSelectionMedicalReport = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IMedicalReport[]) => {
            selectedRows.map((m: any) => {
                setMedicalReport(m);
            });
        },
    };

    const submitForm = (values: any) => {
        const newData = {
                key: count + 1,
                drugName: values?.drugName,
                morningDose: values?.morningDose,
                afternoonDose: values?.afternoonDose,
                eveningDose: values?.eveningDose,
                quantity: values?.quantity,
                note: values?.note
        };
        setDataPrescriptionDetail([...dataPrescriptionDetail, newData]);
        setCount(count + 1);
    };

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IPrescriptionDetail[]) => {
            setDrug(selectedRows);
        },
    };

    const onChange = (e: CheckboxChangeEvent) => {
        setTypePrescription(e.target.checked);
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
                    columns={medicalReportTableResult["columns"]}
                    dataSource={medicalReportTableResult["data"]}
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
                    <Modal 
                        style={{minWidth: '1300px'}} 
                        open={isModalOpen} 
                        onOk={() => {
                            generatePDF()
                            setIsModalOpen(false);
                        }} 
                        onCancel={() => 
                            setIsModalOpen(false)
                        }
                    >
                        <div ref={componentPDF}>
                            <PrescriptionPdfForm prescription={dataPrescription} patient={patient} medicalReport={medicalReport}/>
                        </div>
                    </Modal>
                    <Checkbox onChange={onChange}>Toa dịch vụ</Checkbox>
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
            <PrescriptionForm ref={child.current?.showForm} submitForm={submitForm} />
        </Row>
        <Divider />
        <Row style={{marginTop: '1rem'}}>
            <Table
                rowSelection={{
                    ...rowSelection,
                }}
                columns={prescriptionDetailTableResult["columns"]}
                dataSource={dataPrescriptionDetail}
                style={{minWidth: '900px'}}
            />
        </Row>
    </>
  )
}
