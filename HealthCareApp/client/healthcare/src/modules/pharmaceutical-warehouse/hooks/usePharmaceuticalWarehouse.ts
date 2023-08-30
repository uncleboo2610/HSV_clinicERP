import { useState, useEffect } from "react";
import { pharmaceuticalWarehouseService } from "../services/pharmaceutical-warehouse.service";

export default function usePharmaceuticalWarehouse() {
    const [data, setData] = useState<[]>([]);
    
    useEffect(() => {
        pharmaceuticalWarehouseService.getPharmaceuticalWarehouse()
        .then((res) => {
            setData(res.data)
        })
        .catch((e: any) => console.log(e))
    }, []);
    
    return [data] as const;
}