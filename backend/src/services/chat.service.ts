import { inject, injectable } from "inversify";
import  TYPES  from "../di/types";
import { IChatRepository } from "../repositories/interfaces/IChatRepository";
import { IChatService } from "../services/interfaces/IChatService";
import { IChat } from "../models/Chat";
import { BaseService } from "./base.service";

@injectable()
export class ChatService extends BaseService<IChat> implements IChatService {
    constructor(@inject(TYPES.ChatRepository) private chatRepository: IChatRepository) {
        super(chatRepository)
    }

    async getUserChats(userId: string): Promise<IChat[]> {
        return await this.chatRepository.findUserChats(userId);
    }

    async getChatById(chatId: string): Promise<IChat | null> {
        return await this.chatRepository.findById(chatId)
    }

    async createChat(userId: string, recieverId: string): Promise<IChat> {
        const participants = [userId, recieverId]
        let chat = await this.chatRepository.findExistingChat(participants);
        if (!chat) {
            const data = {participants}
            chat = await this.chatRepository.createChat(data);
        }
        return chat;
    }
}