import { useContext, useEffect, useState } from 'react'
import { patientsService } from '../services/patients.service';
import { IReceivingCard } from '../models';
import { WebsocketContext } from '../../../contexts/WebSocketContext';

export default function useReceivingCard() {
    const [data, setData] = useState([]);
    const socket = useContext(WebsocketContext);

    useEffect(() => {
        socket.on('connect', () => {
        });

        socket.on('onReceiving', (newMessage) => {
        setData(newMessage.content);
        });

        return () => {
        socket.off('connect');
        socket.off('onReceiving');
        };
    }, []);

    useEffect(() => {
        patientsService.getReceivingCardDetail()
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
        }, []);

    return [data] as const;
}