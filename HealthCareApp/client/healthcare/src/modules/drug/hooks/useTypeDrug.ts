import { useState, useEffect } from "react";
import { drugService } from "../services/drug.service";
import { ITypeDrug } from "../models";

export default function useTypeDrug() {
    const [data, setData] = useState<ITypeDrug[]>([]);

    useEffect(() => {
        drugService.getTypeDrug()
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
    }, [])

    return [data] as const;
}