import { inject, injectable } from "inversify";
import { INotificationController } from "./interfaces/INotificationController";
import { Request, Response } from "express";
import { INotificationService } from "../services/interfaces/INotificationService";
import { STATUS_CODES } from "../utils/constants";
import  TYPES  from "../di/types";

@injectable()
export class NotificationController implements INotificationController {
  constructor(@inject(TYPES.NotificationService) private notificationService: INotificationService) {}

//   createNotification = async (req: Request, res: Response) => {
//     const data = req.body;
//     const notification = await this.notificationService.createNotification(data);
//     res.status(StatusCodes.CREATED).json(notification);
//   });

getNotifications = async (req: Request, res: Response) => {
    const userId = req.user?._id as string
    const notifications = await this.notificationService.getUserNotifications(userId);
    res.status(STATUS_CODES.OK).json({message: "Notifications fetched successfully", notifications});
  };

  markNotificationAsRead = async (req: Request, res: Response) => {
    const { notificationId } = req.params;
    const updatedNotification = await this.notificationService.markNotificationAsRead(notificationId);
    res.status(STATUS_CODES.OK).json({ message: "Notification marked as read", notification:updatedNotification });
  };

  markAllNotificationsAsRead = async (req: Request, res: Response) => {
    const userId = req.user?._id as string
    await this.notificationService.markAllNotificationsAsRead(userId);
    res.status(STATUS_CODES.NO_CONTENT).send();
  };

  deleteNotification = async (req: Request, res: Response) => {
    const {notificationId} = req.params
    const notification = await this.notificationService.deleteNotification(notificationId)
    res.status(STATUS_CODES.OK).json({message: "notification deleted", notification})
  }
}