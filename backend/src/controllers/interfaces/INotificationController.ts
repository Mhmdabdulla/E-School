import { RequestHandler } from "express";

export interface INotificationController {
  getNotifications: RequestHandler;
  markNotificationAsRead: RequestHandler;
  markAllNotificationsAsRead: RequestHandler;
  deleteNotification: RequestHandler;
}