import { INotification } from "../../models/Notification";
import { IBaseService } from "./IBaseService";

export interface INotificationService extends IBaseService<INotification> {
  createNotification(data: Partial<INotification>): Promise<INotification>;
  getUserNotifications(userId: string): Promise<INotification[]>;
  markNotificationAsRead(notificationId: string): Promise<INotification | null>;
  markAllNotificationsAsRead(userId: string): Promise<void>;
}