import { useState, useEffect } from "react";
import { paraclinicalService } from "../services/paraclinical.service";
import { medicalExaminationService } from "../../medical-examination/services/medical-examination.service";

export default function useStaffTicket() {
    const [data, setData] = useState([]);

    useEffect(() => {
        medicalExaminationService.getStaffTicket()
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
    }, [])

    return [data] as const;
}