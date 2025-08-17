import { IMessage } from "../../models/Message";
import { IBaseRepository } from "./IBaseRepository";

export interface IMessageRepository extends IBaseRepository<IMessage> {
  findMessagesByChatId(chatId: string): Promise<IMessage[] | null>;
  
}