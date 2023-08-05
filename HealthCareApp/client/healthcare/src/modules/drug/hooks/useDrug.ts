import { useState, useEffect } from "react";
import { IDrug } from "../models";
import { drugService } from "../services/drug.service";

export default function useDrug() {
    const [data, setData] = useState<IDrug[]>([]);

    useEffect(() => {
        drugService.getDrug()
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
    }, [])

    return [data] as const;
}