import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IMessageController } from "./interfaces/IMessageController";
import { IMessageService } from "../services/interfaces/IMessageService";
import  TYPES  from "../di/types";
import { STATUS_CODES } from "../utils/constants";
import { IMessage } from "../models/Message";

@injectable()
export class MessageController implements IMessageController {
    constructor(@inject(TYPES.MessageService) private messageService: IMessageService) {}

    getMessages = async (req: Request, res: Response) => {
        const { chatId } = req.params;
        const messages = await this.messageService.getMessagesByChatId(chatId);
        res.status(STATUS_CODES.OK).json({ message: "Messages fetched successfully", messages });
    };

    createMessage = async (req: Request, res: Response) => {
        const { chatId, body } = req.body;
        const senderId = req.user?._id as string;

        const messageData: Partial<IMessage> = {
        chatId,
        senderId,
        ...(body ? { body } : {})
        };

        const message = await this.messageService.createMessage(messageData, req.file);
        res.status(STATUS_CODES.CREATED).json({ message: "Message sent successfully", messageData: message });
    };

    updateMessage = async (req: Request, res: Response) => {
        const {messageId} = req.params
        const {body} = req.body

        console.log(messageId, body)

        const message = await this.messageService.updateMessage(messageId, body)
        res.status(STATUS_CODES.OK).json({message: "message updated successfully", messageData: message})
    }

    deleteMessage = async (req: Request, res: Response) => {
        const {messageId} = req.params

        const message = await this.messageService.deleteMessage(messageId)
        res.status(STATUS_CODES.OK).json({message: "message deleted successfully", messageData: message})
    }
}