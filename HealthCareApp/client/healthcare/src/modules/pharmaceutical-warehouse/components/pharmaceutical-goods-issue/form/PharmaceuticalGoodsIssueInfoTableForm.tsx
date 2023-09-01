import React, { Ref, forwardRef, useImperativeHandle, useState } from 'react'
import { Modal, Table } from 'antd';
import { usePharmaceuticalGoodsIssueInfoTableFormColumn } from './PharmaceuticalGoodsIssueInfoTableForm.column';

export interface RefObjectTable {
    showTable: () => void;
}

interface Props {
    submitTable: (value: any) => void
}

export const PharmaceuticalGoodsIssueInfoTableForm = (props: Props, ref: Ref<RefObjectTable>) => {
    const [isTableOpen, setIsTableOpen] = useState(false);
    const {submitTable} = props;
    const usePharmaceuticalGoodsIssueTableFormResult = usePharmaceuticalGoodsIssueInfoTableFormColumn();

    function showTable() {
        setIsTableOpen(true);
    }

    function closeTable() {
        setIsTableOpen(false);
    };

    useImperativeHandle(ref, () => ({ showTable }));

    const handleSubmitTable= (values: any) => {
        submitTable(values);
        setIsTableOpen(false);
    };

  return (
    <>
        <Modal
            open={isTableOpen}
            onCancel={closeTable}
            style={{minWidth: '1300px'}}
            footer={null}
        >
            <Table 
                columns={usePharmaceuticalGoodsIssueTableFormResult['columns']} 
                dataSource={usePharmaceuticalGoodsIssueTableFormResult['data']} 
                onRow={(record, rowIndex) => {
                    return {
                    onDoubleClick: event => {
                        handleSubmitTable(record);
                    }, // double click row
                }}}
                style={{padding: '1rem'}}
            />;
        </Modal>
    </>
  )
}

export default forwardRef(PharmaceuticalGoodsIssueInfoTableForm)