import { useEffect, useState } from 'react'
import { patientsService } from '../services/patients.service';
import { IReceivingCard } from '../models';

export default function useReceivingCard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        patientsService.getReceivingCard()
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
    }, []);

    return [data] as const;
}