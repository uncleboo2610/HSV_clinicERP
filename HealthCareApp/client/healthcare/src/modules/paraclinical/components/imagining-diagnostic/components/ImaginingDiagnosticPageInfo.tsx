import { Row, Col, Table } from 'antd';
import ImaginingDiagnosticForm, { RefObject } from '../form/ImaginingDiagnosticForm';
import { ColumnsType } from 'antd/es/table';
import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { imaginingDiagnosticService } from '../services/imagining-diagnostic.service';
import { BasicNotification } from '../../../../../shared/components/BasicNotification';
import { paraclinicalService } from '../../../services/paraclinical.service';

interface DataType {
    key: React.Key;
    url: string;
}

export const ImaginingDiagnosticPageInfo = (props: any) => {
    const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
    const webcamRef = useRef<Webcam>(null);
    const [url, setUrl] = useState<string[]>([]);
    const [selectedUrl, setSelectedUrl] = useState<string[]>([]);
    const child = useRef<RefObject>(null);

    const submitForm = (value: any) => {
        const data = {
            note: value.note,
            paraclinicalDiagnostic: value.note,
            resultSample: value.resultSample,
            patientId: props.ticket.patientId,
            staffId: value.staffId,
            typeServiceId: value.typeServiceId,
            staffTicketId: props.ticket.id   
        };
        
        paraclinicalService.createParaclinicalReport(data)
            .then((res) => {
                imaginingDiagnosticService.createImaginingDiagnosticImage({
                    paraclinicalReportId: res.data.id,
                    imageUrl: selectedUrl
                }).then(() => {
                    BasicNotification(
                        "success",
                        "Success",
                        "Đã lưu báo cáo cận lâm sàng thành công !",
                    );
                }).catch((e) => console.log(e))
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

    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'key',
        },
        {
            title: 'Kết quả',
            dataIndex: 'url',
            render: (value: string, record) => <img style={{height: '100px'}} src={value} />
        },
    ];
    
    const videoConstraints = {
        width: 720,
        height: 360,
        facingMode: "user"
    };

    const data: DataType[] = url.map((url: string, index) => ({
        key: index,
        url: url
    }));
    
    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            selectedRows.map((image) => {
                setSelectedUrl([...selectedUrl, image.url])
            });
        },
    };

    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setUrl([...url, imageSrc]);
        }
    }

  return (
    <div>
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
            <Col span={12}>
                <ImaginingDiagnosticForm ref={child.current?.showForm} submitForm={submitForm}/>
            </Col>
            <Col span={12}>
                {isCaptureEnable || (
                <button onClick={() => setCaptureEnable(true)}>start</button>
                )}
                {isCaptureEnable && (
                    <>
                        <div>
                            <button onClick={() => setCaptureEnable(false)}>end </button>
                        </div>
                        <div>
                            <Webcam
                            audio={false}
                            width={540}
                            height={360}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            mirrored={true}
                            />
                        </div>
                        <button onClick={capture}>capture</button>
                    </>
                )}

                <Table
                    rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                />
            </Col>
        </Row>
    </div>
  )
}
