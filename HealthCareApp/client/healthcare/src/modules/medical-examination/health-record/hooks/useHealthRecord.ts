import { useState, useEffect, useContext } from "react";
import { WebsocketContext } from "../../../../contexts/WebSocketContext";

export default function useHealthRecord() {
    const [data, setData] = useState<[]>([]);
    const socket = useContext(WebsocketContext);

    useEffect(() => {
        socket.on('connect', () => {
        });

        socket.on('onHealthRecord', (newMessage) => {
            setData(newMessage.content.prescription);
        });

        return () => {
            socket.off('connect');
            socket.off('onHealthRecord');
        };
    }, []);

    return [data] as const;
}