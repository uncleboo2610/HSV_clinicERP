import { useState, useEffect } from "react";
import { medicineStoragesService } from "../services/medicine-storage.service";

export default function useMedicineStorage() {
    const [data, setData] = useState<[]>([]);

    useEffect(() => {
        medicineStoragesService.getMedicineStorage()
            .then((res) => {
                setData(res.data)
            })
            .catch((e: any) => console.log(e))
    }, [])

    return [data] as const;
}