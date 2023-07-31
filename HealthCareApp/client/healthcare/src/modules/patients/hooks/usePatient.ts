import { useContext, useEffect, useState } from 'react'
import { IPatient } from '../models';
import { patientsService } from '../services/patients.service';
import { WebsocketContext } from '../../../contexts/WebSocketContext';

export default function usePatient() {
    const [data, setData] = useState<IPatient[]>([]);
    const socket = useContext(WebsocketContext);

    useEffect(() => {
        socket.on('connect', () => {
        });

        socket.on('onPatient', (newMessage) => {
        setData(newMessage.content);
        });

        return () => {
        socket.off('connect');
        socket.off('onPatient');
        };
    }, []);

    useEffect(() => {
        patientsService.getPatients()
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
    }, []);

    return [data] as const;
}