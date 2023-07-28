import { useState, useEffect } from "react";
import { departmentService } from "../services/department.service";
import { IDepartment } from "../models";

export default function useDonation() {
    const [data, setData] = useState<IDepartment[]>([]);

    useEffect(() => {
        departmentService.getDepartment()
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
    }, [])

    return [data] as const;
}