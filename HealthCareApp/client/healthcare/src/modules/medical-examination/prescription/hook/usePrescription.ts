import { useState, useEffect, useContext } from "react";
import { WebsocketContext } from "../../../../contexts/WebSocketContext";

export default function usePrescription() {
    const [data, setData] = useState([]);
    const socket = useContext(WebsocketContext);

    useEffect(() => {
        socket.on('connect', () => {
        });

        socket.on('onPrescription', (newMessage) => {
            setData(newMessage.content.prescription);
        });

        return () => {
        socket.off('connect');
        socket.off('onPrescription');
        };
    }, []);

    return [data] as const;
}