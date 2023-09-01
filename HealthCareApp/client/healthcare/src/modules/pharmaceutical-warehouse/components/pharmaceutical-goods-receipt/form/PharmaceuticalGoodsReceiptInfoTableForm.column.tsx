import { SearchOutlined } from '@ant-design/icons';
import { InputRef, Input, Space, Button } from 'antd';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';
import usePharmaceuticalWarehouse from '../../../hooks/usePharmaceuticalWarehouse';
import { IPharmaceuticalWarehouse } from '../../../models';
  
type DataIndex = keyof IPharmaceuticalWarehouse;

export const usePharmaceuticalGoodsReceiptInfoTableFormColumn = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data] = usePharmaceuticalWarehouse();
    const searchInput = useRef<InputRef>(null);

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

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IPharmaceuticalWarehouse> => ({
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

    const columns: ColumnsType<IPharmaceuticalWarehouse> = [
        {
        title: 'STT',
        dataIndex: 'key',
        key: 'key',
        },
        {
        title: 'Tên thuốc',
        dataIndex: 'drugName',
        key: 'drugName',
        ...getColumnSearchProps('drugName'),
        sorter: (a, b) => a.drugName.length - b.drugName.length,
        sortDirections: ['descend', 'ascend'],
        },
        {
        title: 'Mã thuốc',
        dataIndex: 'drugId',
        key: 'drugId',
        ...getColumnSearchProps('drugId'),
        sorter: (a, b) => a.drugId - b.drugId,
        sortDirections: ['descend', 'ascend'],
        },
        {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        ...getColumnSearchProps('price'),
        sorter: (a, b) => a.price - b.price,
        sortDirections: ['descend', 'ascend'],
        },
        {
        title: 'Đơn vị tính (DVT)',
        dataIndex: 'unit',
        key: 'unit',
        ...getColumnSearchProps('unit'),
        sorter: (a, b) => a.unit.length - b.unit.length,
        sortDirections: ['descend', 'ascend'],
        },
        {
        title: 'Loại thuốc',
        dataIndex: 'typeDrugName',
        key: 'typeDrugName',
        },
        {
        title: 'Số lượng tồn',
        dataIndex: 'quantity',
        key: 'quantity',
        ...getColumnSearchProps('quantity'),
        sorter: (a, b) => a.quantity - b.quantity,
        sortDirections: ['descend', 'ascend'],
        }
    ];

    const dataPharmaceuticalWarehouse: IPharmaceuticalWarehouse[] = data?.map((data: any, i) => ({
        key: i + 1,
        drugName: data?.drug.drugName,
        drugId: data?.drug.id,
        price: data?.drug.price,
        unit: data?.drug.unit,
        typeDrugName: data?.drug?.typeDrug.typeDrugName,
        quantity: data.quantity
    }));

  return {
    columns: [...columns],
    data: dataPharmaceuticalWarehouse,
  }
}
