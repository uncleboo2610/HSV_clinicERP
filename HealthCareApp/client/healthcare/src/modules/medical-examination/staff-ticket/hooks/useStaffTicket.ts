import { useState, useContext, useEffect } from "react";
import { WebsocketContext } from "../../../../contexts/WebSocketContext";
import { staffService } from "../../../staff/services/staff.service";
import { staffTicketService } from "../services/staffTicket.service";

export default function useStaffTicket() {
    const [data, setData] = useState([]);
    const socket = useContext(WebsocketContext);

    useEffect(() => {
        socket.on('connect', () => {});

        socket.on('onStaffTicket', (newMessage) => {
            setData(newMessage.content);
        });

        return () => {
            socket.off('connect');
            socket.off('onStaffTicket');
        };
    }, []);

    useEffect(() => {
        staffTicketService.getStaffTicket()
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
    }, [])

    return [data] as const;
}