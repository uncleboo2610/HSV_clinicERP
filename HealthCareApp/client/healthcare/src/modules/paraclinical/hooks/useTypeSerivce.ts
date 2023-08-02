import { useState, useEffect } from "react";
import { paraclinicalService } from "../services/paraclinical.service";
import { ITypeService } from "../models";

export default function useTypeService() {
    const [data, setData] = useState<ITypeService[]>([]);

    useEffect(() => {
        paraclinicalService.getTypeService()
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
    }, [])

    return [data] as const;
}