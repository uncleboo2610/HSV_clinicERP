import { useRef } from 'react';
import { Space, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IPatient } from '../models';
import useDonation from '../hooks/usePatient';
import { DeleteOutlined, EditOutlined, IdcardOutlined } from '@ant-design/icons';
import ModalReceivingCardForm, { RefObject } from './Form/ModalReceivingCardForm';
import { patientsService } from '../services/patients.service';
  

export const PatientPage = () => {
    const [ data ] = useDonation();
    const child = useRef<RefObject>(null);

    const submitForm = (values: any) => {
        patientsService.createReceivingCard(values)
            .then(() => {
                // SuccessNotification(
                //     'Thông báo',
                //     'Bạn đã tạo thẻ tiếp nhận thành công !'
                // )
            })
            .catch((e) => console.log(e))
    };

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
        },
        {
            title: 'CCCD/CMND',
            width: 100,
            dataIndex: 'idCard',
            key: 'idCard',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: '1',
            width: 150,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: '2',
            width: 150,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: '3',
            width: 150,
        },
        {
            title: 'Nơi sinh',
            dataIndex: 'pob',
            key: '4',
            width: 150,
        },
        {
            title: 'Nghề nghiệp',
            dataIndex: 'job',
            key: '5',
            width: 150,
        },
        {
            title: 'Tương tác',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (_, record) => (
                <>
                    <Space>
                        <Tooltip title={'Tạo thẻ tiếp nhận'}>
                            <IdcardOutlined
                                style={{ fontSize: "1.2rem", color: "green" }}
                                onClick={() => {
                                    console.log('clicked')
                                    child.current?.openModal(record);
                                }} 
                            />
                        </Tooltip>
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
                        <ModalReceivingCardForm ref={child} submitModalForm={submitForm} />
                    </Space>
                </>
            ),
        },
    ];

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
    }));

  return (
        <Table columns={columnsPatient} dataSource={dataPatient} />
  )
}
