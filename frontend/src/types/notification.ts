export interface Notification extends Document {
    _id:string;
    type: string; 
    title: string;
    description: string;
    userId: string;
    chatId?: string;
    courseId?: string;
    messageId?: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
  }