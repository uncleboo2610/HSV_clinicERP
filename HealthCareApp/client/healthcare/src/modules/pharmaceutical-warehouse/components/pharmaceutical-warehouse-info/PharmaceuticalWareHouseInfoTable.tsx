import React from 'react'
import { usePharmaceuticalWareHouseInfoTableColumn } from './PharmaceuticalWareHouseInfoTable.column';
import { Table } from 'antd';

export const PharmaceuticalWareHouseInfoTable = () => {
    const usePharmaceuticalWareHouseInfoTableResult = usePharmaceuticalWareHouseInfoTableColumn();
  return (
    <>
        <Table 
            columns={usePharmaceuticalWareHouseInfoTableResult['columns']} 
            dataSource={usePharmaceuticalWareHouseInfoTableResult['data']} 
        />;
    </>
  )
}
