// repositories/message.repository.ts
import { BaseRepository } from "./base.repository";
import { IMessageRepository } from "./interfaces/IMessageRepository";
import { Message, IMessage } from "../models/Message";
import { injectable } from "inversify";

@injectable()
export class MessageRepository extends BaseRepository<IMessage> implements IMessageRepository {
    constructor() {
        super(Message);
    }

    async findMessagesByChatId(chatId: string): Promise<IMessage[] | null> {
        return Message.find({ chatId }).sort({ createdAt: 1 });
    }

    async findByIdAndUpdate(id: string, data: Partial<IMessage>): Promise<IMessage | null> {
        return Message.findByIdAndUpdate(id, data, {new: true})
    }

}