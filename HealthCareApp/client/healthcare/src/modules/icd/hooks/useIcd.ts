import { useState, useEffect } from "react";
import { icdService } from "../services/icd.service";
import { IIcd } from "../../HomePage";

export default function useIcd() {
    const [data, setData] = useState<IIcd[]>([]);

    useEffect(() => {
        icdService.getIcd()
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
    }, []);

    return [data] as const;
}