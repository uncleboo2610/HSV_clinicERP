import { useState, useContext, useEffect } from "react";
import { WebsocketContext } from "../../../../contexts/WebSocketContext";
import { medicalExaminationService } from "../services/medical-examination.service";

export default function useMedicalReport() {
    const [medicalReportData, setMedicalReportData] = useState<[]>([]);
    const socket = useContext(WebsocketContext);

    useEffect(() => {
        socket.on('connect', () => {
        });

        socket.on('onMedicalReport', (newMessage) => {
            setMedicalReportData(newMessage.content);
            console.log(newMessage.content)
        });

        return () => {
        socket.off('connect');
        socket.off('onMedicalReport');
        };
    }, []);

    useEffect(() => {
        medicalExaminationService.getMedicalReport()
            .then((res) => {
                setMedicalReportData(res.data)
            })
            .catch((error) => console.log(error))
    }, []);

    return [medicalReportData] as const;
}