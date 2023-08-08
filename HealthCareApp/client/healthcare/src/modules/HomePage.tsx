import { useRef } from 'react';
import { Button, Space, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import usePatient from './patients/hooks/usePatient';
import { IPatient } from './patients/models';
import { useReactToPrint } from "react-to-print";


export const HomePage = () => {
    const [ data ] = usePatient();

    const componentPDF = useRef(null)
    const generatePDF = useReactToPrint({
      content: () => componentPDF.current,
      documentTitle: "test pdf",
      onAfterPrint: () => alert("saved")
    })
            
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
        createdAt: patient.createdAt
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
    ];

  return (
    <>
        <div ref={componentPDF}>
            <Table
            columns={columnsPatient}
            dataSource={dataPatient}
            pagination={false}
            style={{padding: '50px'}}
            />
        </div>
        <Button onClick={generatePDF}>pdf</Button>
    </>
  )
}
