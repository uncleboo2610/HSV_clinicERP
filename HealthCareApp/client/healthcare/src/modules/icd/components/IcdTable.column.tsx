import { ColumnType, ColumnsType } from 'antd/es/table';
import React, { useEffect, useRef, useState } from 'react'
import { IIcd } from '../models';
import { SearchOutlined } from '@ant-design/icons';
import { InputRef, Input, Space, Button } from 'antd';
import { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { IPatient } from '../../patients/models';

type DataIndex = keyof IIcd;

export const useIcdTableColumn = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const icdTypeOptions = [
        { value: 'A', label: 'Bệnh nhiễm trùng và ký sinh trùng (1)' },
        { value: 'B', label: 'Bệnh nhiễm trùng và ký sinh trùng (2)' },
        { value: 'C', label: 'U tân sinh' },
        { value: 'D', label: 'U tân sinh/ Bệnh máu, cơ quan tạo máu và các bệnh lý liên quan đến cơ chế miễn dịch' },
        { value: 'E', label: 'Bệnh nội tiết, dinh dưỡng và chuyển hóa' },
        { value: 'F', label: 'Rối loạn tâm thần và hành vi' },
        { value: 'G', label: 'Bệnh hệ thần kinh' },
        { value: 'H', label: 'Bệnh mắt và thần phụ/ Bệnh tai và xương chũm' },
        { value: 'I', label: 'Bệnh hệ tuần hoàn' },
        { value: 'J', label: 'Bệnh hệ hô hấp' },
        { value: 'K', label: 'Bệnh hệ tiêu hóa' },
        { value: 'L', label: 'Bệnh da và tổ chức dưới da' },
        { value: 'M', label: 'Bệnh hệ cơ, xương, khớp và mô liên kết' },
        { value: 'N', label: 'Bệnh hệ sinh dụng, tiết niệu' },
        { value: 'O', label: 'Mang thai, sinh đẻ và hậu sản' },
        { value: 'P', label: 'Một số bệnh lý khởi phát trong thời kỳ chu sinh' },
        { value: 'Q', label: 'Dị tật bẩm sinh, biến dạng và bất thường về nhiễm sắc thể' },
        { value: 'R', label: 'Các triệu chứng và bất thường về lâm sàng, cận lâm sàng không phân loại nơi khác' },
        { value: 'S', label: 'Tổn thương, ngộ độc và hậu quả của một số nguyên nhân từ bên ngoài (1)' },
        { value: 'T', label: 'Tổn thương, ngộ độc và hậu quả của một số nguyên nhân từ bên ngoài (2)' },
        { value: 'Y', label: 'Các nguyên nhân bên ngoài của bệnh tật và tử vong (1)' },
        { value: 'X', label: 'Các nguyên nhân bên ngoài của bệnh tật và tử vong (2)' },
        { value: 'V', label: 'Các nguyên nhân bên ngoài của bệnh tật và tử vong (3)' },
        { value: 'Z', label: 'Các yếu tốt liên quan đến tình trạng sức khỏe và tiếp cận dịch vụ y tế' },
        { value: 'U', label: 'Mã dành cho những mục đích đặc biệt' },
    ];

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
    
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IIcd> => ({
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

    const columnsIcd: ColumnsType<IIcd> = [
        {
            title: 'Mã ICD',
            dataIndex: 'dmIcdMaIcd',
            key: 'dmIcdMaIcd',
            ...getColumnSearchProps('dmIcdMaIcd'),
        },
        {
            title: 'Tên ICD',
            dataIndex: 'dmIcdTenIcd',
            key: 'dmIcdTenIcd',
            ...getColumnSearchProps('dmIcdTenIcd'),
        },
        {
            title: 'Tên ICD(EN)',
            dataIndex: 'dmIcdTenIcdEn',
            key: 'dmIcdTenIcdEn',
            ...getColumnSearchProps('dmIcdTenIcdEn'),
        },
        {
            title: 'Tên ICD(RU)',
            dataIndex: 'TenICD_Ru',
            key: 'TenICD_Ru',
        },
    ];

  return {
    columns: columnsIcd,
    options: icdTypeOptions
  }
}
