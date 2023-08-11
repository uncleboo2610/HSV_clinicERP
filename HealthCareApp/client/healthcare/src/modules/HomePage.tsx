import { useRef } from 'react';
import { Button, Space, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import usePatient from './patients/hooks/usePatient';
import { IPatient } from './patients/models';
import { useReactToPrint } from "react-to-print";
import { WebCamImage } from './camera/WebCamImage';


export const HomePage = () => {

  return (
    <WebCamImage />
  )
}
