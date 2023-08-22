import { Table, Modal, TableColumnsType, Button, Row, Space } from 'antd';
import { useEffect, useRef, useState } from 'react'
import { IImaginingDiagnosticRecord } from '../../../../models';
import { ImaginingDiagnosticRecordDetail } from './ImaginingDiagnosticRecordDetail';
import { imaginingDiagnosticService } from '../../services/imagining-diagnostic.service';
import { UploadOutlined } from '@ant-design/icons';
import { patientsService } from '../../../../../patients/services/patients.service';
import { useReactToPrint } from 'react-to-print';
import { ImaginingDiagnosticReportPdf } from './ImaginingDiagnosticReportPdf';

export const ImaginingDiagnosticRecordTable = (props: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalPdfOpen, setIsModalPdfOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState<[]>([]);
    const [dataDetailPdf, setDataDetailPdf] = useState<[]>([]);
    const [paraclinicalReportId, setParaclinicalReportId] = useState<string>();
    const [paraclinicalReport, setParaclinicalReport] = useState<IImaginingDiagnosticRecord>();

    const [data, setData] = useState<IImaginingDiagnosticRecord[]>([]);

    const componentPDF = useRef(null);
    const generatePDF = useReactToPrint({
      content: () => componentPDF.current,
      documentTitle: "Kết quả chẩn đoán hình ảnh",
    });

    const onCheck = () => {
        patientsService.getPatientById(props?.ticket?.patientId)
            .then((res) => {
                setData(res.data.paraclinicalReport)
            })
            .catch((e) => console.log(e));
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleOk = () => {
        setIsModalOpen(false);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModalPdf = () => {
        imaginingDiagnosticService.getImaginingDiagnosticImagesById({
            paraclinicalReportId: paraclinicalReportId
        }).then((res) => {
            setDataDetailPdf(res.data);
        }).catch((e) => console.log(e));
        setIsModalPdfOpen(true);
    };

    const handleOkPdf = () => {
        generatePDF()
        setIsModalPdfOpen(false);
    };

    const handleCancelPdf = () => {
        setIsModalPdfOpen(false);
    };

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IImaginingDiagnosticRecord[]) => {
            selectedRows.map((report) => {
                setParaclinicalReportId(report.id);
                setParaclinicalReport(report);
            })
        },
    };
    
    const columnsRecord: TableColumnsType<IImaginingDiagnosticRecord> = [
        { title: 'STT', dataIndex: 'key', key: 'key' },
        { title: 'Tên bệnh nhân', dataIndex: 'patientName', key: 'patientName' },
        { title: 'Tên bác sĩ', dataIndex: 'staffName', key: 'staffName' },
        { title: 'Chuẩn Đoán', dataIndex: 'paraclinicalDiagnostic', key: 'paraclinicalDiagnostic' },
        { title: 'Ghi chú', dataIndex: 'note', key: 'note' },
        { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
    ];
    
    const dataRecord: IImaginingDiagnosticRecord[] = data.map((record: any, i) => ({
        key: i + 1,
        id: record.id,
        note: record.note,
        paraclinicalDiagnostic: record.paraclinicalDiagnostic,
        patientName: record.patient?.name,
        staffName: record.staff?.name,
        resultSample: record.resultSample,
        createdAt: record.createdAt,
    }))
  return (
    <>
        <Row style={{marginBottom: '1rem'}}>
            <Space>
                <Button type="primary" onClick={onCheck}>Xem bệnh án</Button>
                <>
                    <Button icon={<UploadOutlined />} onClick={showModalPdf}>In</Button>
                    <Modal style={{minWidth: '1300px'}} open={isModalPdfOpen} onOk={handleOkPdf} onCancel={handleCancelPdf}>
                        <div ref={componentPDF} >
                            <ImaginingDiagnosticReportPdf paraclinicalReport={paraclinicalReport} dataImage={dataDetailPdf}/>
                        </div>
                    </Modal>
                </>
            </Space>
        </Row>
        <Table
            rowSelection={{
                type: 'radio',
                ...rowSelection,
            }}
            columns={columnsRecord}
            dataSource={dataRecord}
            onRow={(record, rowIndex) => {
                return {
                onDoubleClick: event => {
                    imaginingDiagnosticService.getImaginingDiagnosticImagesById({
                        paraclinicalReportId: record.id
                    }).then((res) => {
                        setDataDetail(res.data);
                    }).catch((e) => console.log(e));
                    showModal();
                },
            }}}
        />
        <Modal 
            title="Mẫu kết quả" 
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel} 
            style={{minWidth: '1300px'}}
        >
            <ImaginingDiagnosticRecordDetail record={dataDetail}/>
        </Modal>
    </>
  )
}
