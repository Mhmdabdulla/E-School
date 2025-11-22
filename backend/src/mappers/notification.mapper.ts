import { INotification } from "../models/Notification";
import { NotificationResponseDTO } from "../dto/response/notification.response.dto";


export const mapNotificationToDTO = (
  notification: INotification
): NotificationResponseDTO => {
const n = notification as any;

  return {
    _id: n._id.toString(),
    type: n.type,
    title: n.title,
    description: n.description,
    userId: n.userId.toString(),
    chatId: n.chatId?.toString(),
    courseId: n.courseId?.toString(),
    messageId: n.messageId?.toString(),
    isRead: n.isRead,
    createdAt: n.createdAt,
    updatedAt: n.updatedAt,
  };
};

export const mapNotificationsToDTO = (
  notifications: INotification[]
): NotificationResponseDTO[] => {
  return notifications.map((n) => mapNotificationToDTO(n));
};
