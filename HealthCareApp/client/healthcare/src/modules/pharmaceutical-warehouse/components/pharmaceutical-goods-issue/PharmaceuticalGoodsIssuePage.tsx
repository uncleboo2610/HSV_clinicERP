import React, { useEffect, useRef, useState } from 'react'
import { IMedicineTable } from '../../models';
import { Button, Col, Row, Space, Table } from 'antd';
import { BasicNotification } from '../../../../shared/components/BasicNotification';
import { pharmaceuticalWarehouseService } from '../../services/pharmaceutical-warehouse.service';
import PharmaceuticalGoodsIssueForm, { RefObject } from './form/PharmaceuticalGoodsIssueForm';
import { usePharmaceuticalGoodsIssueTableColumn } from './PharmaceuticalGoodsIssueTable.column';

export const PharmaceuticalGoodsIssuePage = () => {
    const child = useRef<RefObject>(null);
    const [count, setCount] = useState<number>(0);
    const [medicine, setMedicine] = useState<IMedicineTable[]>([]);
    const pharmaceuticalGoodsIssueTableResult = usePharmaceuticalGoodsIssueTableColumn();

    const onCreatingPharmaceuticalGoodsIssue = () => {
        pharmaceuticalWarehouseService.createPharmaceuticalGoodsIssueNote({
            exportInStock: ``,
            location: ``
        }).then((res) => {
            pharmaceuticalWarehouseService.createPharmaceuticalGoodsIssue({
                detail: medicine,
                pharmaceuticalGoodsIssueNoteId: res.data.id
            })
                .then(() => {
                    BasicNotification(
                        "success",
                        "Success",
                        "Đã xuât kho thành công !",
                    );
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
            drugId: values.drugId,
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
            <PharmaceuticalGoodsIssueForm 
                ref={child.current?.showForm} 
                submitForm={submitForm} 
                onCreatingPharmaceuticalGoodsIssue={onCreatingPharmaceuticalGoodsIssue} 
                clearTable={() => setMedicine([])}
            />
        </Col>
        <Col span={24}>
            <>  
                <Row style={{marginTop: '1rem'}}>
                    <Table
                        columns={pharmaceuticalGoodsIssueTableResult["columns"]}
                        dataSource={medicine}
                        style={{minWidth: '900px'}}
                    />
                </Row>
            </>
        </Col>
    </Row>
  )
}
