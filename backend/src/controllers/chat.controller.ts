import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IChatController } from "./interfaces/IChatController";
import { IChatService } from "../services/interfaces/IChatService";
import  TYPES  from "../di/types";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class ChatController implements IChatController {
    constructor(@inject(TYPES.ChatService) private chatService: IChatService) {}

    getChats = async (req: Request, res: Response) => {
        const userId = req.user?._id as string;
        const chats = await this.chatService.getUserChats(userId);
        res.status(STATUS_CODES.OK).json({ message: "Chats fetched successfully", chats });
    };

    createChat = async (req: Request, res: Response) => {
        const { recieverId } = req.body
        const userId = req.user?._id as string 
        const chat = await this.chatService.createChat(userId, recieverId)
        res.status(STATUS_CODES.CREATED).json({ message: "Chat created or fetched successfully", chat });
    };
}