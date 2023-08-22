import { useState, useEffect, useContext } from "react";
import { WebsocketContext } from "../../../../contexts/WebSocketContext";

export default function usePrescriptionDetail() {
    const [data, setData] = useState([]);
    const [patient, setPatient] = useState([]);
    const [medicalReport, setMedicalReport] = useState([]);
    const socket = useContext(WebsocketContext);

    useEffect(() => {
        socket.on('connect', () => {
        });

        socket.on('onPrescriptionDetail', (newMessage) => {
            setData(newMessage.content.prescriptionDetail);
            setPatient(newMessage.content.patient);
            setMedicalReport(newMessage.content.medicalReport);
        });

        return () => {
        socket.off('connect');
        socket.off('onPrescriptionDetail');
        };
    }, []);

    return [data, patient, medicalReport] as const;
}