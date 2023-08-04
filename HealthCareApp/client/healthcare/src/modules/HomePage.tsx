import { useRef } from 'react';
import { Button, Space, Table, Tooltip } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import { RefObject } from './patients/components/form/ModalReceivingCardFrom';
import { IdcardOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { BasicNotification } from '../shared/components/BasicNotification';
import usePatient from './patients/hooks/usePatient';
import { IPatient } from './patients/models';
import { patientsService } from './patients/services/patients.service';
import { useReactToPrint } from "react-to-print";


export const HomePage = () => {
    const [ data ] = usePatient();
    const child = useRef<RefObject>(null);

    const componentPDF = useRef(null)
    const generatePDF = useReactToPrint({
      content: () => componentPDF.current,
      documentTitle: "test pdf",
      onAfterPrint: () => alert("saved")
    })

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
    }));

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
                        {/* <ModalReceivingCardForm ref={child} submitModalForm={submitForm} /> */}
                    </Space>
                </>
            ),
        },
    ];

  return (
    <>
        <div ref={componentPDF}>
            <Table
            columns={columnsPatient}
            dataSource={dataPatient}
            pagination={false}
            />
        </div>
        <Button onClick={generatePDF}>pdf</Button>
    </>
  )
}
