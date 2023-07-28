import { notification } from "antd";

export function BasicNotification(
    type: any,
    title: string,
    description: any,
    duration = 5 as number,
) {
    return notification.open({
        type: type,
        message: title,
        description: description,
        duration: duration,
    });
}