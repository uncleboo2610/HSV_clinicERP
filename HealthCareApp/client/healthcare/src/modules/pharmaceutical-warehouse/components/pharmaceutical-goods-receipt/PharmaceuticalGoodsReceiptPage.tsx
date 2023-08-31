import React, { useRef, useState } from 'react'
import PharmaceuticalGoodsReceiptForm, { RefObject } from './form/PharmaceuticalGoodsReceiptForm';
import { IMedicineTable } from '../../models';
import { Col, Row } from 'antd';
import { PharmaceuticalGoodsReceiptTable } from './PharmaceuticalGoodsReceiptTable';

export const PharmaceuticalGoodsReceiptPage = () => {
    const child = useRef<RefObject>(null);
    const [count, setCount] = useState<number>(0);
    const [medicine, setMedicine] = useState<IMedicineTable[]>([]);

    const submitForm = (value: any) => {
        const newData = {
            key: count + 1,
            drugName: value.drugName,
            price: value.price,
            unit: value.unit,
            typeDrugName: value.typeDrugName,
            quantity: value.quantity
        };

        setMedicine([...medicine, newData]);
        setCount(count + 1);
        
        // drugService.createDrug(data)
        //     .then((res) => {
        //         pharmaceuticalWarehouseService.createPharmaceuticalWarehouse({
        //             drugId: res.data.id,
        //             quantity: value.quantity
        //         }).then(() => {
        //             BasicNotification(
        //                 "success",
        //                 "Success",
        //                 "Đã lưu báo cáo cận lâm sàng thành công !",
        //             );
        //         }).catch((e) => {
        //             BasicNotification(
        //                 "error",
        //                 "Error",
        //                 "Failed to update data !",
        //             );
        //             console.log(e);
        //         })
        //     })
        //     .catch((e) => {
        //         BasicNotification(
        //             "error",
        //             "Error",
        //             "Failed to update data !",
        //         );
        //         console.log(e);
        //     });
    };
  return (
    <Row>
        <Col span={24}>
            <PharmaceuticalGoodsReceiptForm ref={child.current?.showForm} submitForm={submitForm} />
        </Col>
        <Col span={24}>
            <PharmaceuticalGoodsReceiptTable medicine={medicine} />
        </Col>
    </Row>
  )
}
