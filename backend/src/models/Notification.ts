import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  type: string; 
  title: string;
  description: string;
  userId: mongoose.Types.ObjectId | string;
  chatId?: mongoose.Types.ObjectId | string;
  courseId?: mongoose.Types.ObjectId | string;
  messageId?: mongoose.Types.ObjectId | string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat' },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    messageId: { type: Schema.Types.ObjectId, ref: 'Message' },
    isRead: { type: Boolean, default: false},
  },
  { timestamps: true }
);

export default mongoose.model<INotification>('Notification', notificationSchema);