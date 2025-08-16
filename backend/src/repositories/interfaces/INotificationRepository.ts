import { INotification } from "../../models/Notification";
import { IBaseRepository } from "./IBaseRepository";

export interface INotificationRepository extends IBaseRepository<INotification> {
  createNotification(data: Partial<INotification>): Promise<INotification>;
  getNotificationsByUser(userId: string): Promise<INotification[]>;
  markAsRead(notificationId: string): Promise<INotification | null>;
  markAllAsRead(userId: string): Promise<void>;
}