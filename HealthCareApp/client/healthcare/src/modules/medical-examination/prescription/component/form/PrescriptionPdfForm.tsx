import { Table, Button, Col, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { IPrescriptionDetail } from '../../models';
import usePrescriptionDetail from '../../hook/usePrescriptionDetail';
import { useEffect, useState } from 'react';
import { IPatient } from '../../../../patients/models';
import { IMedicalReport } from '../../../medical-report/models';

export const PrescriptionPdfForm = (props: any) => {
    const [data, setData] = useState([]);
    const [patient, setPatient] = useState<IPatient>();
    const [medicalReport, setMedicalReport] = useState<IMedicalReport>();

    useEffect(() => {
        setData(props.prescription);
        setPatient(props.patient);
        setMedicalReport(props.medicalReport);
        console.log(props)
    }, [props])
            
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
    
    const dataPrescriptionDetail: IPrescriptionDetail[] = data?.map((prescriptionDetail: any, i: any) => ({
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

  return (
    <>
        <div style={{padding: '50px'}}>
            <Row style={{marginTop: '1rem'}}>
                <Col span={10}>
                    <div>
                        <span>Họ tên bệnh nhân: {patient?.name}</span>
                    </div>
                </Col>
                <Col span={14}>
                    <div>
                        <span>Giới tính: {patient?.gender}</span>
                    </div>
                </Col>
                <Col span={24}>
                    <div>
                        <span>Ngày sinh: {patient?.dob}</span>
                    </div>
                </Col>
                <Col span={24}>
                    <div>
                        <span>Địa chỉ: {patient?.address}</span>
                    </div>
                </Col>

                <Col span={24}>
                    <div>
                        <span>Chấn đoán: {medicalReport?.diagnostic}</span>
                    </div>
                </Col>
            </Row>
            <Table
                columns={columnsPrescriptionDetail}
                dataSource={dataPrescriptionDetail}
                style={{minWidth: '900px', marginTop: '1rem'}}
                pagination={false}
            />
            <Row style={{ marginTop: '1rem'}}>
                <Col span={24}>
                    <div>
                        <span>Ngày tái khám: {medicalReport?.reExaminationDate}</span>
                    </div>
                </Col>
            </Row>
        </div>
    </>
  )
}
