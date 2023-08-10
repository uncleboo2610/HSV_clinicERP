import { useState, useContext, useEffect } from "react";
import { WebsocketContext } from "../../../../contexts/WebSocketContext";

export default function useStaffTicketDetail() {
    const [data, setData] = useState([]);
    const [dataSaffTicket, setDataSaffTicket] = useState();
    const socket = useContext(WebsocketContext);

    useEffect(() => {
        socket.on('connect', () => {});

        socket.on('onStaffTicketDetail', (newMessage) => {
            setDataSaffTicket(newMessage.content);
            setData(newMessage.content.staffTicketDetail);
        });

        return () => {
            socket.off('connect');
            socket.off('onStaffTicketDetail');
        };
    }, []);

    return [data, dataSaffTicket] as const;
}