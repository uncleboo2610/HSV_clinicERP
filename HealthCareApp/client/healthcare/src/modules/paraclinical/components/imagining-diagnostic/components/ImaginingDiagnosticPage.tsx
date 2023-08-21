import { Col, Divider, Row, Table, Tabs, TabsProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { IStaffTicket } from '../../../../medical-examination/medical-report/models';
import useStaffTicket from '../../../../medical-examination/staff-ticket/hooks/useStaffTicket';
import { ImaginingDiagnosticPageInfo } from './ImaginingDiagnosticPageInfo';
import { ImaginingDiagnosticRecordPage } from './imagining-diagnostic-record/ImaginingDiagnosticRecordPage';

export const ImagingDiagnosticPage = () => {
    const [data] = useStaffTicket();
    const [value, setValue] = useState<IStaffTicket | null>(data[0]);
    
    const columnsStaffTicket: ColumnsType<IStaffTicket> = [
        {
            title: 'STT',
            width: 50,
            dataIndex: 'key',
            key: 'key',
        },
        {
          title: 'Tên bệnh nhân',
          dataIndex: 'patientName',
          key: 'patientName',
        },
        {
          title: 'Mã bệnh nhân',
          dataIndex: 'patientId',
          key: 'patientId'
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note'
        }
    ];
      
    const dataStaffTicket: IStaffTicket[] = data.map((staffTicket: any, i) => ({
        key: i + 1,
        id: staffTicket?.id,
        patientName: staffTicket?.patient?.name,
        patientId: staffTicket?.patient?.id,
        note: staffTicket?.note
    }))
      
    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IStaffTicket[]) => {
            selectedRows.map((values) => {
                setValue(values);
            })
        },
    };
    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Thông tin chẩn đoán hình ảnh`,
            children: <ImaginingDiagnosticPageInfo ticket={value} />,
        },
        {
            key: '2',
            label: `Lịch sử cận lâm sàng`,
            children: <ImaginingDiagnosticRecordPage ticket={value} />,
        },
    ];
    
  return (
    <>
        <Row>
            <Col span={16}>
                <Table
                    rowSelection={{
                        type: 'radio',
                        ...rowSelection,
                    }}
                    columns={columnsStaffTicket}
                    dataSource={dataStaffTicket}
                    size='small'
                />
                <Divider />
            </Col>
        </Row>
        <Tabs 
            defaultActiveKey="1" 
            items={items}
        />
    </>
  )
}
