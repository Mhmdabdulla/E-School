import { INotificationService } from "../services/interfaces/INotificationService";
import { INotificationRepository } from "../repositories/interfaces/INotificationRepository";
import { inject, injectable } from "inversify";
import  TYPES  from "../di/types";
import { INotification } from "../models/Notification";
import { mapNotificationsToDTO, mapNotificationToDTO } from "../mappers/notification.mapper";
import { NotificationResponseDTO } from "../dto/response/notification.response.dto";

@injectable()
export class NotificationService  implements INotificationService {
  constructor(@inject(TYPES.NotificationRepository) private notificationRepository: INotificationRepository) {
    
  }

  async createNotification(data: Partial<INotification>): Promise<NotificationResponseDTO> {
    const created = await this.notificationRepository.createNotification(data);
    return mapNotificationToDTO(created);
  }

  async getUserNotifications(userId: string): Promise<NotificationResponseDTO[]> {
    const notifications = await this.notificationRepository.getNotificationsByUser(userId);
    return mapNotificationsToDTO(notifications);
  }

  async markNotificationAsRead(notificationId: string): Promise<NotificationResponseDTO | null> {
    const updated = await this.notificationRepository.markAsRead(notificationId);
    return updated ? mapNotificationToDTO(updated) : null;
  }

  async markAllNotificationsAsRead(userId: string): Promise<void> {
      this.notificationRepository.markAllAsRead(userId);
  }

  async deleteNotification(notificationId: string): Promise<NotificationResponseDTO  | null> {
    const deleted = await this.notificationRepository.delete(notificationId);
    return deleted ? mapNotificationToDTO(deleted) : null;
  }

}