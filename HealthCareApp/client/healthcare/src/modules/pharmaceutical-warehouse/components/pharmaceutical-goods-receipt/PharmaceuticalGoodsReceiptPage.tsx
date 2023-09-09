import React, { useEffect, useRef, useState } from 'react'
import PharmaceuticalGoodsReceiptForm, { RefObject } from './form/PharmaceuticalGoodsReceiptForm';
import { IMedicineTable } from '../../models';
import { Button, Col, Row, Space, Table } from 'antd';
import { BasicNotification } from '../../../../shared/components/BasicNotification';
import { pharmaceuticalWarehouseService } from '../../services/pharmaceutical-warehouse.service';
import { usePharmaceuticalGoodsReceiptTableColumn } from './PharmaceuticalGoodsReceiptTable.column';

export const PharmaceuticalGoodsReceiptPage = () => {
    const child = useRef<RefObject>(null);
    const [count, setCount] = useState<number>(0);
    const [medicine, setMedicine] = useState<IMedicineTable[]>([]);
    const pharmaceuticalGoodsReceiptTableResult = usePharmaceuticalGoodsReceiptTableColumn();

    const onCreatingPharmaceuticalGoodsReceipt = () => {
        pharmaceuticalWarehouseService.createPharmaceuticalGoodsReceiptNote({
            inputInStock: ``,
            location: ``
        }).then((res) => {
            pharmaceuticalWarehouseService.createPharmaceuticalGoodsReceipt({
                detail: medicine,
                pharmaceuticalGoodsReceiptNoteId: res.data.id
            })
                .then(() => {
                    BasicNotification(
                        "success",
                        "Success",
                        "Đã nhập kho thành công !",
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
        }).catch((e) => {
            BasicNotification(
                "error",
                "Error",
                "Failed to update data !",
            );
            console.log(e);
        });
    };

    const submitForm = (values: any) => {
        const newData = {
            key: count + 1,
            drugName: values.drugName,
            price: values.price,
            unit: values.unit,
            typeDrugName: values.typeDrugName,
            quantity: values.quantity
        };

        setMedicine([...medicine, newData]);
        setCount(count + 1);
    };
  return (
    <Row>
        <Col span={24}>
            <PharmaceuticalGoodsReceiptForm 
                ref={child.current?.showForm} 
                submitForm={submitForm} 
                onCreatingPharmaceuticalGoodsReceipt={onCreatingPharmaceuticalGoodsReceipt} 
                clearTable={() => setMedicine([])}
            />
        </Col>
        <Col span={24}>
            <>  
                <Row style={{marginTop: '1rem'}}>
                    <Table
                        columns={pharmaceuticalGoodsReceiptTableResult["columns"]}
                        dataSource={medicine}
                        style={{minWidth: '900px'}}
                    />
                </Row>
            </>
        </Col>
    </Row>
  )
}
