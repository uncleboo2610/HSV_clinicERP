import { useState, useEffect } from "react";
import { IParaclinicalReport } from "../models";
import { paraclinicalService } from "../services/paraclinical.service";

export default function useParaclinicalReport() {
    const [data, setData] = useState<IParaclinicalReport[]>([]);

    useEffect(() => {
        paraclinicalService.getParaclinicalReports()
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
    }, []);

    return [data] as const;
}