import { Divider, Table, Button, Row, Col, Input, Space, InputRef, Tabs, TabsProps } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { useRef, useState } from 'react';
import { MedicalExaminationForm } from './form/MedicalExaminationForm';
import { SearchOutlined } from '@ant-design/icons';
import { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { StaffTicketForm } from './form/StaffTicketForm';
import useReceivingCard from '../../../patients/hooks/useReceivingCard';
import { IReceivingCardDetail, IPatient } from '../../../patients/models';
import { PrescriptionPage } from '../../prescription/component/PrescriptionPage';
import { HealthRecordPage } from '../../health-record/components/HealthRecordPage';

type DataIndex = keyof IReceivingCardDetail;

export const MedicalExaminationPage = () => {
    const [data] = useReceivingCard();
    const [patient, setPatient] = useState<IPatient | null>(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    
    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };
    
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IReceivingCardDetail> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => clearFilters && handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                    confirm({ closeDropdown: false });
                    setSearchText((selectedKeys as string[])[0]);
                    setSearchedColumn(dataIndex);
                    }}
                >
                    Filter
                </Button>
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                    close();
                    }}
                >
                    close
                </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columnsReceivingCard: ColumnsType<IReceivingCardDetail> = [
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
          ...getColumnSearchProps('patientName')
        },
        {
          title: 'Mã bệnh nhân',
          dataIndex: 'patientId',
          key: 'patientId'
        },
        {
            title: 'Khoa khám bệnh',
            dataIndex: 'departmentName',
            key: 'departmentName'
        }
    ];
      
    const dataReceivingCard: IReceivingCardDetail[] = data.map((receivingCardDetail: any, i) => ({
        key: i + 1,
        id: receivingCardDetail.id,
        patientName: receivingCardDetail.patient.name,
        patientId: receivingCardDetail.patient.id,
        departmentName: receivingCardDetail.department.departmentName
    }))
      
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
                    columns={columnsReceivingCard}
                    dataSource={dataReceivingCard}
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
