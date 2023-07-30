import { useEffect, useState } from 'react'
import { IPatient } from '../models';
import { patientsService } from '../services/patients.service';

export default function usePatient() {
    const [data, setData] = useState<IPatient[]>([]);

    useEffect(() => {
        patientsService.getPatients()
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
    }, []);

    return [data] as const;
}