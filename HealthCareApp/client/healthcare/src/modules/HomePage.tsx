import { Button, Form, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { icdService } from "./icd/services/icd.service";
import { useState } from "react";
import { IcdTable } from "./icd/components/IcdTable";

export const HomePage = () => {
    
  return (
    <IcdTable />
  )
}
