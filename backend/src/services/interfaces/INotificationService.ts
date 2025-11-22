import { NotificationResponseDTO } from "../../dto/response/notification.response.dto";
import { INotification } from "../../models/Notification";


export interface INotificationService  {
  createNotification(data: Partial<INotification>): Promise<NotificationResponseDTO>;
  getUserNotifications(userId: string): Promise<NotificationResponseDTO[]>;
  markNotificationAsRead(notificationId: string): Promise<NotificationResponseDTO  | null>;
  markAllNotificationsAsRead(userId: string): Promise<void>;
  deleteNotification(notificationId: string): Promise<NotificationResponseDTO  | null> 
}