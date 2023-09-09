import { useState, useEffect, useContext } from "react";
import { WebsocketContext } from "../../../../contexts/WebSocketContext";

export default function useMedicalRecord() {
    const [data, setData] = useState<[]>([]);
    const socket = useContext(WebsocketContext);

    useEffect(() => {
        socket.on('connect', () => {
        });

        socket.on('onMedicalRecord', (newMessage) => {
            setData(newMessage.content.prescription);
        });

        return () => {
            socket.off('connect');
            socket.off('onMedicalRecord');
        };
    }, []);

    return [data] as const;
}