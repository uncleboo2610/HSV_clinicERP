import React, { useState } from 'react'
import Table, { ColumnsType } from 'antd/es/table';
import { Row, Col, Divider } from 'antd';
import { ImagingDiagnosticForm } from './form/ImagingDiagnosticForm';
import useStaffTicket from '../../../staff/hooks/useStaffTicket';
import { IStaffTicket } from '../../../medical-examination/medical-report/models';

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
    
  return (
    <div>
        <Row>
            <Col span={'16'}>
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
        <Row>
            <Col span={'24'}>
                <ImagingDiagnosticForm ticket={value}/>
            </Col>
        </Row>
    </div>
  )
}
