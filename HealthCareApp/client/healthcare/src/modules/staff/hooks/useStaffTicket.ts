import { useState, useEffect, useContext } from "react";
import { WebsocketContext } from "../../../contexts/WebSocketContext";
import { staffService } from "../services/staff.service";

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
        staffService.getStaffTicket()
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => console.log(error))
    }, [])

    return [data] as const;
}