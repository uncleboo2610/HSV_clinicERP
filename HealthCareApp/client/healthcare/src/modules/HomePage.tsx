import { Button, Form, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import useIcd from "./icd/hooks/useIcd"

export interface IIcd {
  dmIcdIcdId: number;
  dmIcdMaIcd: string;
  dmIcdTenIcd: string;
  dmIcdTenIcdEn: string;
  dmIcdTenIcdRu: string;
    dmIcdMucIcd: number;
    dmIcdIcdNhomId: number;
    dmIcdPhanNhom: string;
    dmIcdLoai: number;
    dmIcdBenhTruyenNhiem: boolean;
    dmIcdTamNgung: boolean;
    dmIcdTenKhongDau: string;
    dmIcdNgayTao: Date;
    dmIcdNguoiTaoId: number;
    dmIcdNgayCapNhat: Date;
    dmIcdNguoiCapNhatId: number;
    dmIcdMa: number;
}

export const HomePage = () => {
    const [data] = useIcd()
    console.log(data)
    const columnsIcd: ColumnsType<IIcd> = [
      {
        title: 'Mã ICD',
        dataIndex: 'dmIcdMaIcd',
        key: 'dmIcdMaIcd',
      },
      {
        title: 'Tên ICD',
        dataIndex: 'dmIcdTenIcd',
        key: 'dmIcdTenIcd'
      },
      {
          title: 'Tên ICD(EN)',
          dataIndex: 'dmIcdTenIcdEn',
          key: 'dmIcdTenIcdEn'
      },
      {
        title: 'Tên ICD(RU)',
        width: 50,
        dataIndex: 'TenICD_Ru',
        key: 'TenICD_Ru',
    },
  ];
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
}))

const icdTypeOptions = [
  { value: 'jack', label: 'Jack' },
  { value: 'Lucy', label: 'Lucy' },
  { value: 'Yiminghe', label: 'yiminghe' },
  { value: 'disabled', label: 'Disabled', disabled: true },
  { value: 'jack1', label: 'Jack1' },
  { value: 'Lucy1', label: 'Lucy1' },
  { value: 'Yiminghe1', label: 'yiminghe1' },
  { value: 'jack2', label: 'Jack1' },
  { value: 'Lucy2', label: 'Lucy1' },
  { value: 'Yiminghe2', label: 'yiminghe1' },
];

const handleSearch = (values: any) => {
  console.log(values)
}
  return (
    <>
      <Form
        onFinish={handleSearch}
      >
        <Form.Item
            name="typeSolutionId"
            label="Cách giải quyết"
            rules={[{ required: true, message: `Please input a service!` }]}
        >
            <Select
                mode="multiple"
                showSearch
                placeholder="Select a solutiond"
                optionFilterProp="children"
                options={icdTypeOptions}
            />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Tìm
            </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columnsIcd}
        dataSource={dataIcd}
      />
    </>
  )
}
