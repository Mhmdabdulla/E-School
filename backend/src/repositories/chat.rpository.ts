import { BaseRepository } from "./base.repository";
import { IChatRepository } from "./interfaces/IChatRepository";
import { Chat, IChat } from "../models/Chat";
import { injectable } from "inversify";

@injectable()
export class ChatRepository extends BaseRepository<IChat> implements IChatRepository {
    constructor() {
        super(Chat);
    }

    async findUserChats(userId: string): Promise<IChat[]> {
        return Chat.find({ participants: userId})
        .populate({
            path: "participants",
            select: "name profileImageUrl", 
        })
        .populate("lastMessage").sort({ updatedAt: -1 });
    }

    async findExistingChat(participants: string[]): Promise<IChat | null> {
        return Chat.findOne({ participants: { $all: participants, $size: participants.length } });
    }

    async createChat(chat: Partial<IChat>): Promise<IChat> {
        return await Chat.create(chat);
    }
}