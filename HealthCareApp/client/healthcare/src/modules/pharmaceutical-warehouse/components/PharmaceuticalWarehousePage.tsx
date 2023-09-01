import React from 'react'
import { PharmaceuticalWareHouseInfoPage } from './pharmaceutical-warehouse-info/PharmaceuticalWareHouseInfoPage';
import { TabsProps, Tabs } from 'antd';
import { PharmaceuticalGoodsIssuePage } from './pharmaceutical-goods-issue/PharmaceuticalGoodsIssuePage';
import { PharmaceuticalGoodsReceiptPage } from './pharmaceutical-goods-receipt/PharmaceuticalGoodsReceiptPage';

export const PharmaceuticalWarehousePage = () => {
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: `Nhập kho`,
          children: <PharmaceuticalGoodsReceiptPage />,
        },
        {
          key: '2',
          label: `Xuất kho`,
          children: <PharmaceuticalGoodsIssuePage />,
        },
        {
            key: '3',
            label: `Xem thông tin kho thuốc`,
            children: <PharmaceuticalWareHouseInfoPage />
        }
    ];

  return (
    <Tabs defaultActiveKey="1" items={items} />
  )
}
