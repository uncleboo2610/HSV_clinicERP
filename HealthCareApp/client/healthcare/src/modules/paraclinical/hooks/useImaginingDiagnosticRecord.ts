import { useState, useEffect, useContext } from "react";
import { WebsocketContext } from "../../../contexts/WebSocketContext";

export default function useParaclinicalRecord() {
    const [data, setData] = useState<[]>([]);
    const socket = useContext(WebsocketContext);

    useEffect(() => {
        socket.on('connect', () => {
        });

        socket.on('onParaclinicalRecord', (newMessage) => {
            setData(newMessage.content);
        });

        return () => {
            socket.off('connect');
            socket.off('onParaclinicalRecord');
        };
    }, []);

    return [data] as const;
}