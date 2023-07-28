import { Radio, Divider, Table, Button, Row, Col } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import useReceivingCard from '../../patients/hooks/useReceivingCard'
import { IReceivingCard } from '../../patients/models';
import { MedicalExaminationForm } from './form/MedicalExaminationForm';

type DataIndex = keyof IReceivingCard;

export const MedicalExaminationPage = () => {
    const [data] = useReceivingCard();
    const [patientId, setPatientId] = useState('');
    const [patientName, setPatientName] = useState('');

    const columnsReceivingCard: ColumnsType<IReceivingCard> = [
        {
            title: 'STT',
            width: 50,
            dataIndex: 'key',
            key: 'key',
        },
        {
          title: 'Tên bệnh nhân',
          dataIndex: 'patientName',
          key: 'patientName'
        },
        {
          title: 'Mã bệnh nhân',
          dataIndex: 'patientId',
          key: 'patientId'
        }
    ];
      
    const dataReceivingCard: IReceivingCard[] = data.map((receivingCard: any, i) => ({
        key: i + 1,
        id: receivingCard.id,
        patientName: receivingCard.patientName,
        patientId: receivingCard.patient.id,
    }))
      
      // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IReceivingCard[]) => {
            const pId = selectedRows.map((p: any) => {return p.patientId});
            const pName = selectedRows.map((p: any) => {return p.patientName});
            setPatientId(String(pId));
            setPatientName(String(pName));
        },
    };

  return (
    <div>
        <Row>
            <Col span={'10'}>
                <Table
                    rowSelection={{
                        type: 'radio',
                        ...rowSelection,
                    }}
                    columns={columnsReceivingCard}
                    dataSource={dataReceivingCard}
                    size='small'
                />
                
                <Divider />
            </Col>
        </Row>
        <Row>
            <Col span={'24'}>
                <MedicalExaminationForm patientId={patientId} patientName={patientName} />
            </Col>
        </Row>
    </div>
  )
}
