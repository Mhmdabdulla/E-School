import { INotificationRepository } from "./interfaces/INotificationRepository";
import { BaseRepository } from "./base.repository";
import Notification, { INotification } from "../models/Notification";

export class NotificationRepository extends BaseRepository<INotification> implements INotificationRepository {
  constructor() {
    super(Notification);
  }

  async createNotification(data: Partial<INotification>): Promise<INotification> {
    return Notification.create(data);
  }

  async getNotificationsByUser(userId: string): Promise<INotification[]> {
    return Notification.find({ userId }).sort({ createdAt: -1 });
  }

  async markAsRead(notificationId: string): Promise<INotification | null> {
    return Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
  }

  async markAllAsRead(userId: string): Promise<void> {
    await Notification.updateMany({ userId, isRead: false }, { isRead: true });
  }
}