import Table, { ColumnsType } from "antd/es/table";
import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { imaginingDiagnosticService } from "../paraclinical/components/imagining-diagnostic/services/imagining-diagnostic.service";
// import "./styles.css";

interface DataType {
    key: React.Key;
    url: string;
}


export const WebCamImage = (props: any) => {
    const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
    const webcamRef = useRef<Webcam>(null);
    const [url, setUrl] = useState<string[]>([]);
    const [selectedUrl, setSelectedUrl] = useState<string[]>([]);

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

    const save = () => {
        imaginingDiagnosticService.createImaginingDiagnosticImage({
            medicalReportId: props.report.id,
            imageUrl: selectedUrl
        }).then(() => console.log('ok')).catch((e) => console.log(e))
    }

  return (
    <>
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
                <button onClick={save}>save</button>
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
        </>
    );
};