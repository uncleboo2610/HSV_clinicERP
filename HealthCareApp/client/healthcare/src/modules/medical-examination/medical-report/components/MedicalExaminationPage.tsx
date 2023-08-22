import { Divider, Table, Button, Row, Col, Input, Space, InputRef, Tabs, TabsProps } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { useRef, useState } from 'react';
import { MedicalExaminationForm } from './form/MedicalExaminationForm';
import { SearchOutlined } from '@ant-design/icons';
import { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { StaffTicketForm } from '../../staff-ticket/components/StaffTicketForm';
import useReceivingCard from '../../../patients/hooks/useReceivingCard';
import { IReceivingCardDetail, IPatient } from '../../../patients/models';
import { PrescriptionPage } from '../../prescription/component/PrescriptionPage';
import { HealthRecordPage } from '../../health-record/components/HealthRecordPage';
import { useReceivingCardTableColumn } from './ReceivingCardTable.column';

type DataIndex = keyof IReceivingCardDetail;

export const MedicalExaminationPage = () => {
    const [patient, setPatient] = useState<IPatient | null>(null);
    const resultTable = useReceivingCardTableColumn();
      
    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IReceivingCardDetail[]) => {
            selectedRows.map((p: any) => {
                setPatient(p)
            });
        },
    };

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: `Phiếu khám bệnh`,
          children: <MedicalExaminationForm patient={patient} />,
        },
        {
          key: '2',
          label: `Ticket`,
          children: <StaffTicketForm patient={patient}/>,
        },
        {
            key: '3',
            label: `Thêm toa thuốc`,
            children: <PrescriptionPage patient={patient}/>
        },
        {
            key: '4',
            label: `Bệnh án`,
            children: <HealthRecordPage patient={patient}/>
        }
    ];

  return (
    <div>
        <Row>
            <Col span={'16'}>
                <Table
                    rowSelection={{
                        type: 'radio',
                        ...rowSelection,
                    }}
                    columns={resultTable['columns']}
                    dataSource={resultTable['data']}
                    size='small'
                />
                
                <Divider />
            </Col>
        </Row>
        <Row>
            <Col span={'24'}>
                <Tabs defaultActiveKey="1" items={items} />
            </Col>
        </Row>
    </div>
  )
}
