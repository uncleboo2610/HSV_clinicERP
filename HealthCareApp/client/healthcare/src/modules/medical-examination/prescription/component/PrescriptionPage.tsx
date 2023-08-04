import { Button } from 'antd';
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import { PrescriptionForm } from './form/PrescriptionForm';

export const PrescriptionPage = () => {

    const componentPDF = useRef(null)
    const generatePDF = useReactToPrint({
      content: () => componentPDF.current,
      documentTitle: "test pdf",
      onAfterPrint: () => alert("saved")
    })

  return (
    <>
        {/* <div ref={componentPDF}>
            <Table
            columns={columnsPatient}
            dataSource={dataPatient}
            pagination={false}
            />
        </div> */}
        <PrescriptionForm />
        <Button onClick={generatePDF}>pdf</Button>
    </>
  )
}
