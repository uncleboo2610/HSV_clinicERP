import { useContext, useRef, useState } from 'react';
import { Button, Input, InputRef, Row, Space, Table, Tooltip } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { IPatient } from '../models';
import { DeleteOutlined, EditOutlined, IdcardOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { patientsService } from '../services/patients.service';
import { BasicNotification } from '../../../shared/components/BasicNotification';
import { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import usePatient from '../hooks/usePatient';
import ModalReceivingCardForm, { RefObject } from './form/ModalReceivingCardFrom';
import { WebsocketContext } from '../../../contexts/WebSocketContext';
import { HealthRecordPage } from '../../medical-examination/health-record/components/HealthRecordPage';
  
type DataIndex = keyof IPatient;

export const PatientPage = () => {
    const [ data ] = usePatient();
    const child = useRef<RefObject>(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [patient, setPatient] = useState<[]>([])
    const searchInput = useRef<InputRef>(null);
    const socket = useContext(WebsocketContext);

    const submitForm = (values: any) => {
        patientsService.createReceivingCard({
            patientId: values.patientId,
            patientName: values.patientName
        })
        .then((res) => {
            patientsService.createReceivingCardDetail({
                patientId: values.patientId,
                receivingCardId: res.data.id,
                departmentId: values.departmentId
            }).then(() => {
                BasicNotification(
                    "success",
                    "Success",
                    "Đã đăng kí phiếu tiếp nhận thành công !",
                );
                socket.emit('newReceiving')
            }).catch((e) => {
                BasicNotification(
                    "error",
                    "Error",
                    "Failed to update data !",
                );
                console.log(e);
            })
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
            
    const dataPatient: IPatient[] = data.map((patient, i) => ({
        key: i + 1,
        id: patient.id,
        name: patient.name,
        dob: patient.dob,
        idCard: patient.idCard,
        address: patient.address,
        gender: patient.gender,
        phone: patient.phone,
        pob: patient.pob,
        job: patient.job,
        createdAt: patient.createdAt,
    }));

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
    
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IPatient> => ({
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

    const columnsPatient: ColumnsType<IPatient> = [
        {
            title: 'STT',
            width: 50,
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Họ tên',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name')
        },
        {
            title: 'CCCD/CMND',
            width: 100,
            dataIndex: 'idCard',
            key: 'idCard',
            ...getColumnSearchProps('idCard')
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: '1',
            width: 150,
            ...getColumnSearchProps('address')
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: '2',
            width: 150,
            ...getColumnSearchProps('gender')
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: '3',
            width: 150,
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Nơi sinh',
            dataIndex: 'pob',
            key: '4',
            width: 150,
            ...getColumnSearchProps('pob')
        },
        {
            title: 'Nghề nghiệp',
            dataIndex: 'job',
            key: '5',
            width: 150,
            ...getColumnSearchProps('job')
        },
        {
            title: 'Tương tác',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <>
                    <Space>
                        {/* <Tooltip title={'Tạo thẻ tiếp nhận'}>
                            <IdcardOutlined
                                style={{ fontSize: "1.2rem", color: "green" }}
                                onClick={() => {
                                    child.current?.openModal(record);
                                }} 
                            />
                        </Tooltip> */}
                        <Tooltip title={'Chỉnh sửa'}>
                            <EditOutlined
                                style={{ fontSize: "1.2rem", color: "orange" }}
                                onClick={() => {
                                    console.log('clicked')
                                }}
                            />
                        </Tooltip>
                        <Tooltip title={'Xóa'}>
                            <DeleteOutlined
                                style={{ fontSize: "1.2rem", color: "red" }}
                                onClick={() => {
                                    console.log('clicked')
                                }}
                            />
                        </Tooltip>
                        {/* <ModalReceivingCardForm ref={child} submitModalForm={submitForm} /> */}
                    </Space>
                </>
            ),
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IPatient[]) => {
            selectedRows.map((p: any) => {
                return setPatient(p);
            });
        },
    };

    const onReceiving = () => {
        // socket.emit('newHealthRecord', {to: socket.id, data: props?.patient?.id})
        child.current?.openModal(patient);
    };

  return (
    <>
        <Row>
            <Space>
                <Button 
                    type="primary" 
                    onClick={() => {
                        child.current?.openModal(patient);
                    }}
                >
                    Tạo phiếu tiếp nhận
                </Button>
                <Button icon={<UploadOutlined />} >In</Button>
                <ModalReceivingCardForm ref={child} submitModalForm={submitForm} />
            </Space>
        </Row>
        <Row style={{marginTop: '1rem', marginBottom: '1rem'}}>
            <Table 
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                columns={columnsPatient} 
                dataSource={dataPatient} 
            />
        </Row>
        <HealthRecordPage patient={patient}/>
    </>
  )
}
