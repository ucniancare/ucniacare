import { Timestamp } from "@angular/fire/firestore";
import { Notification } from "../shared-interfaces/notification";


export class NotificationModel {

    static fromJson(json: any): Notification {
        return {
            id: json.id,
            targetUsers: json.targetUsers,
            type: json.type,
            title: json.title,
            description: json.description,
            status: json.status,
            origin: json.origin,
            metaData: json.metaData
        };
    }

    static toJsonPartial(notification: Partial<Notification>): any {
        return {
            ...(notification.id !== undefined && { id: notification.id }),
            ...(notification.targetUsers !== undefined && { targetUsers: notification.targetUsers }),
            ...(notification.type !== undefined && { type: notification.type }),
            ...(notification.title !== undefined && { title: notification.title }),
            ...(notification.description !== undefined && { description: notification.description }),
            ...(notification.status !== undefined && { status: notification.status }),
            ...(notification.origin !== undefined && { origin: notification.origin }),
            ...(notification.metaData !== undefined && { metaData: notification.metaData })
        }
    }

    static toJson(notification: Notification): any {
        return {
            //id: notification.id,
            targetUsers: notification.targetUsers,
            type: notification.type,
            title: notification.title,
            description: notification.description,
            status: notification.status,
            origin: notification.origin,
            metaData: notification.metaData
        };
    }
}
