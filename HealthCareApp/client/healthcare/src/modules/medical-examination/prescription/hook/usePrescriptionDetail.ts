import { useState, useEffect, useContext } from "react";
import { WebsocketContext } from "../../../../contexts/WebSocketContext";

export default function usePrescription() {
    const [data, setData] = useState<[]>([]);
    const socket = useContext(WebsocketContext);

    useEffect(() => {
        socket.on('connect', () => {
        });

        socket.on('onPrescriptionDetail', (newMessage) => {
            setData(newMessage.content);
        });

        return () => {
        socket.off('connect');
        socket.off('onPrescriptionDetail');
        };
    }, []);

    return [data] as const;
}