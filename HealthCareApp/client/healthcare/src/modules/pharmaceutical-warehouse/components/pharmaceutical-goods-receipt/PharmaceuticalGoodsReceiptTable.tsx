import { Button, Row, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { IMedicineTable } from '../../models'
import { usePharmaceuticalGoodsReceiptTableColumn } from './PharmaceuticalGoodsReceiptTable.column';
import { pharmaceuticalWarehouseService } from '../../services/pharmaceutical-warehouse.service';
import { BasicNotification } from '../../../../shared/components/BasicNotification';

export const PharmaceuticalGoodsReceiptTable = (props: any) => {
    const [medicineData, setMedicineData] = useState<IMedicineTable[]>([]);
    const pharmaceuticalGoodsReceiptTableResult = usePharmaceuticalGoodsReceiptTableColumn();

    useEffect(() => {
        setMedicineData(props.medicine);
    }, [props]);

    const onCreatingPharmaceuticalGoodsReceipt = () => {
        pharmaceuticalWarehouseService.createPharmaceuticalWarehouse(medicineData)
            .then(() => {
                BasicNotification(
                    "success",
                    "Success",
                    "Đã lưu báo cáo cận lâm sàng thành công !",
                );
                // setMedicineData([]);
            })
            .catch((e) => {
                BasicNotification(
                    "error",
                    "Error",
                    "Failed to update data !",
                );
                console.log(e);
            })
    };

  return (
    <>  
        <Row style={{marginTop: '1rem'}}>
            <Table
                columns={pharmaceuticalGoodsReceiptTableResult["columns"]}
                dataSource={medicineData}
                style={{minWidth: '900px'}}
            />
        </Row>
        <Row style={{marginTop: '1rem'}}>
            <Space direction='horizontal' style={{width: '100%', justifyContent: 'start'}}>
                <Button onClick={onCreatingPharmaceuticalGoodsReceipt}>
                    Nhập kho
                </Button>
                <Button onClick={() => setMedicineData([])}>
                    Xóa bảng
                </Button>
            </Space>
        </Row>
    </>
  )
}
