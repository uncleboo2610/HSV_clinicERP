import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react'
import { icdService } from '../services/icd.service';
import { Button, Form, Select } from 'antd';
import { IIcd } from '../models';
import { useIcdTableColumn } from './IcdTable.column';

export const IcdTable = () => {
    const [data, setData] = useState<IIcd[]>([]);
    const useIcdTableResult = useIcdTableColumn()

    const handleSearch = (values: any) => {
        console.log(values.groupIcdId)
        icdService.getIcdById(values.groupIcdId).then((res: any) => setData(res.data))
    };

    const dataIcd: IIcd[] = data.map((icd, i) => ({
        key: i + 1,
        dmIcdIcdId: icd.dmIcdIcdId,
        dmIcdMaIcd: icd.dmIcdMaIcd,
        dmIcdTenIcd: icd.dmIcdTenIcd,
        dmIcdTenIcdEn: icd.dmIcdTenIcdEn,
        dmIcdTenIcdRu: icd.dmIcdTenIcdRu,
        dmIcdMucIcd: icd.dmIcdMucIcd,
        dmIcdIcdNhomId: icd.dmIcdIcdNhomId,
        dmIcdPhanNhom: icd.dmIcdPhanNhom,
        dmIcdLoai: icd.dmIcdLoai,
        dmIcdBenhTruyenNhiem: icd.dmIcdBenhTruyenNhiem,
        dmIcdTamNgung: icd.dmIcdTamNgung,
        dmIcdTenKhongDau: icd.dmIcdTenKhongDau,
        dmIcdNgayTao: icd.dmIcdNgayTao,
        dmIcdNguoiTaoId: icd.dmIcdNguoiTaoId,
        dmIcdNgayCapNhat: icd.dmIcdNgayCapNhat,
        dmIcdNguoiCapNhatId: icd.dmIcdNguoiCapNhatId,
        dmIcdMa: icd.dmIcdMa,
    }));

  return (
    <>
        <Form
            onFinish={handleSearch}
        >
            <Form.Item
                name="groupIcdId"
                label="Nhóm bệnh ICD"
                rules={[{ required: true }]}
            >
                <Select
                    showSearch
                    placeholder="Select a solutiond"
                    optionFilterProp="children"
                    options={useIcdTableResult['options']}
                />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Tìm
                </Button>
            </Form.Item>
        </Form>
        <Table
            columns={useIcdTableResult['columns']}
            dataSource={dataIcd}
        />
    </>
  )
}
