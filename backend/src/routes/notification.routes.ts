import express from 'express'
import container from '../di/inversify.config';
import { INotificationController } from '../controllers/interfaces/INotificationController';
import  TYPES  from '../di/types';
import { authMiddleware } from '../middlewares/auth.middleware';
import { UserRole } from '../utils/constants';

const router = express.Router()

const notificationController = container.get<INotificationController>(TYPES.NotificationController)


router.get("/", authMiddleware([UserRole.INSTRUCTOR, UserRole.USER]), notificationController.getNotifications);
router.delete("/:notificationId", authMiddleware([UserRole.INSTRUCTOR, UserRole.USER]), notificationController.deleteNotification)
router.patch("/:notificationId/read", authMiddleware([UserRole.INSTRUCTOR, UserRole.USER]), notificationController.markNotificationAsRead);
router.patch("/read", authMiddleware([UserRole.INSTRUCTOR, UserRole.USER]), notificationController.markAllNotificationsAsRead);

export default router