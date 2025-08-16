import { INotificationService } from "../services/interfaces/INotificationService";
import { INotificationRepository } from "../repositories/interfaces/INotificationRepository";
import { inject, injectable } from "inversify";
import  TYPES  from "../di/types";
import { BaseService } from "./base.service";
import { INotification } from "../models/Notification";

@injectable()
export class NotificationService extends BaseService<INotification> implements INotificationService {
  constructor(@inject(TYPES.NotificationRepository) private notificationRepository: INotificationRepository) {
    super(notificationRepository)
  }

  async createNotification(data: Partial<INotification>): Promise<INotification> {
    return this.notificationRepository.createNotification(data);
  }

  async getUserNotifications(userId: string): Promise<INotification[]> {
    return this.notificationRepository.getNotificationsByUser(userId);
  }

  async markNotificationAsRead(notificationId: string): Promise<INotification | null> {
    return this.notificationRepository.markAsRead(notificationId);
  }

  async markAllNotificationsAsRead(userId: string): Promise<void> {
    return this.notificationRepository.markAllAsRead(userId);
  }
}