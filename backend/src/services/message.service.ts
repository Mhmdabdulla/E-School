import { inject, injectable } from "inversify";
import { IMessageService } from "./interfaces/IMessageService";
import { IMessage } from "../models/Message";
import  TYPES  from "../di/types";
import { IMessageRepository } from "../repositories/interfaces/IMessageRepository";
import { BaseService } from "./base.service";
import { IChatRepository } from "../repositories/interfaces/IChatRepository";
import { getIO, getUserSocketId } from "../config/socket";
import { IChat } from "../models/Chat";
import { SocketEvents } from "../utils/constants";
import { deleteFileFromS3, uploadImageToS3, uploadPdfToS3, uploadVideoToS3 } from "../utils/s3Services";
import { INotificationRepository } from "../repositories/interfaces/INotificationRepository";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { AppError } from "../utils/AppError";

@injectable()
export class MessageService extends BaseService<IMessage> implements IMessageService {
    private io: ReturnType<typeof getIO>;
    private getUserSocketId: typeof getUserSocketId;
    constructor(
        @inject(TYPES.MessageRepository) private messageRepository: IMessageRepository,
        @inject(TYPES.ChatRepository) private chatRepositroy: IChatRepository,
        @inject(TYPES.NotificationRepository) private notificationRepository: INotificationRepository,
        @inject(TYPES.UserRepository) private userRepository: IUserRepository
    ) {
        super(messageRepository)
        this.io = getIO(); 
        this.getUserSocketId = getUserSocketId; 
    }

    async getMessagesByChatId(chatId: string): Promise<IMessage[] | null> {
        return this.messageRepository.findMessagesByChatId(chatId)
    }


    async createMessage(
    data: Partial<IMessage>,
    attachment?: Express.Multer.File
): Promise<IMessage | null> {
    const chat = await this.chatRepositroy.findById(data.chatId as string);
    if (!chat) {
        throw new AppError("Chat not found");
    }

    const participants = chat.participants.filter(
        (p) => p.toString() !== data.senderId?.toString()
    );

    const attachments: IMessage["attachments"] = [];

    if (attachment) {
        const mime = attachment.mimetype;
        const size = attachment.size;
        let uploadedUrl: string | null = null;

        if (mime.startsWith("image/")) {
            uploadedUrl = await uploadImageToS3(attachment.buffer, "chat/attachments",mime);
        } else if (mime.startsWith("video/")) {
            const videoUpload = await uploadVideoToS3(attachment.buffer, "chat/attachments",mime);
            uploadedUrl = videoUpload?.url ?? null;
        } else if (mime === "application/pdf") {
            const _pdfUpload = await uploadPdfToS3(attachment.buffer, "chat/attachments")
            uploadedUrl = _pdfUpload?.url as string | null;
        }

        if (uploadedUrl) {
            attachments.push({ url: uploadedUrl, mime, size });
        }
    }

    const message = await this.messageRepository.create({
        ...data,
        attachments: attachments.length > 0 ? attachments : undefined,
    });

    await this.chatRepositroy.update(data.chatId as string, {
        lastMessage: message?._id,
    } as Partial<IChat>);

    const sender = await this.userRepository.findById(message?.senderId as string)

    for (const pId of participants) {
        const socketId = getUserSocketId(pId);
        if (socketId) {
            getIO().to(socketId).emit(SocketEvents.NEW_MESSAGE, message);
            const notification = await this.notificationRepository.create({
                type: "chat",
                title: "New Message",
                description: `You have received a new message. from ${sender?.name}`,
                userId: pId,
                chatId: chat._id as string,
                messageId: message?._id as string,
            });
            getIO().to(socketId).emit(SocketEvents.RECEIVE_NOTIFICATION, notification);
        }
    }

    return message;
}


    async updateMessage(messageId: string, body: string): Promise<IMessage | null> {
        const updatedMessage = await this.messageRepository.findByIdAndUpdate(messageId, {body})
        console.log(messageId, body)

        const chat = await this.chatRepositroy.findById(updatedMessage?.chatId as string);
        if (!chat) {
            throw new Error("Chat not found");
        }
        const participants  = chat.participants.filter(p => p.toString() !== updatedMessage?.senderId?.toString())

        participants.forEach(pId => {
            const socketId = getUserSocketId(pId)
            if(socketId){
                getIO().to(socketId).emit(SocketEvents.UPDATE_MESSAGE, updatedMessage)
            }
        })

        return updatedMessage
    }

    async deleteMessage(messageId: string): Promise<IMessage | null> {
    // Find the message to access attachments for deleting from s3
    const message = await this.messageRepository.findById(messageId);
    if (!message) {
        throw new AppError("Message not found");
    }

    // Delete attachments from Cloudinary if any
    if (message.attachments && message.attachments.length > 0) {
        for (const attachment of message.attachments) {
            const { url, mime } = attachment;

            if (mime.startsWith("image/")) {
                await deleteFileFromS3(url);
            } else if (mime.startsWith("video/")) {
                await deleteFileFromS3(url);
            } else if (mime === "application/pdf") {
                await deleteFileFromS3(url);
            }
        }
    }

    // delete the message from DB
    const deletedMessage = await this.messageRepository.delete(messageId);
    if (!deletedMessage) {
        throw new Error("Failed to delete message");
    }

    // Update chat and notify participants
    const chat = await this.chatRepositroy.findById(deletedMessage.chatId as string);
    if (!chat) {
        throw new AppError("Chat not found");
    }
    const participants = chat.participants.filter(
        (p) => p.toString() !== deletedMessage.senderId?.toString()
    );

    participants.forEach((pId) => {
        const socketId = getUserSocketId(pId);
        if (socketId) {
            getIO().to(socketId).emit(SocketEvents.DELETE_MESSAGE, deletedMessage);
        }
    });

    return deletedMessage;
}


}