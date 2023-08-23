import { useState, useEffect } from "react";
import { medicalStoragesService } from "../services/medical-storage.service";

export default function useMedicineStorage() {
    const [data, setData] = useState<[]>([]);

    useEffect(() => {
        medicalStoragesService.getMedicalStorageById(1)
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
    }, [])

    return [data] as const;
}