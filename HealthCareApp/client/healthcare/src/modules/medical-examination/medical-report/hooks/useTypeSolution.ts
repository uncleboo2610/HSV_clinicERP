import { useState, useContext, useEffect } from "react";
import { medicalExaminationService } from "../services/medical-examination.service";
import { ITypeSolution } from "../models";

export default function useTypeSolution() {
    const [data, setData] = useState<ITypeSolution[]>([]);
    useEffect(() => {
        medicalExaminationService.getTypeSolution()
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
    }, []);

    return [data] as const;
}