import { useEffect, useState } from 'react'
import { IPatient } from '../models';
import { patientsService } from '../services/patients.service';
import { SuccessNotification } from '../../../shared/components/SuccessNotification';

export default function useDonation() {
    const [data, setData] = useState<IPatient[]>([]);

    useEffect(() => {
        patientsService.getPatients()
            .then((res) => {
                setData(res.data)
                SuccessNotification(
                    "error",
                    "Error",
                    "Failed to add or update member",
                )
            })
            .catch((error) => console.log(error))
    }, [])

    return [data] as const;
}