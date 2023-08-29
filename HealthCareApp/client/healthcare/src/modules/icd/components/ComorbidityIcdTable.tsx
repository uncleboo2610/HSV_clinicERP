import Table, { ColumnsType } from 'antd/es/table';
import { Ref, forwardRef, useImperativeHandle, useState } from 'react'
import { icdService } from '../services/icd.service';
import { Button, Form, Modal, Select } from 'antd';
import { IIcd } from '../models';
import { useIcdTableColumn } from './IcdTable.column';

export interface RefObjectComorbidityIcd {
    openModal: (data: any) => void;
}

interface Props {
    submitModalForm: (value: any) => void;
}

export const ComorbidityIcdTable = (props: Props, ref: Ref<RefObjectComorbidityIcd>) => {
    const { submitModalForm } = props;
    
    const [data, setData] = useState<IIcd[]>([]);
    const useIcdTableResult = useIcdTableColumn()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = (values: any) => {
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

    function closeModal() {
        setIsModalOpen(false);
    };
    
    function openModal(data: any) {
        setIsModalOpen(true);
    };

    useImperativeHandle(ref, () => ({ openModal }));

    const handleSubmit = (values: any) => {
        submitModalForm(values);
        closeModal();
    };

  return (
    <>
        <Modal
            title="Đăng kí khám bệnh"
            open={isModalOpen}
            onCancel={closeModal}
            style={{minWidth: '1300px'}}
            footer={null}
        >
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
                        placeholder="Select a disease"
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
                onRow={(record, rowIndex) => {
                    return {
                    onDoubleClick: event => {
                        handleSubmit(record);
                    }, // double click row
                }}}
            />
        </Modal>
    </>
  )
}

export default forwardRef(ComorbidityIcdTable)