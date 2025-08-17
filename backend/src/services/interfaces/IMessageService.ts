import { IMessage } from "../../models/Message";
import { IBaseService } from "./IBaseService";

export interface IMessageService extends IBaseService<IMessage> {
  createMessage(data: Partial<IMessage>, attachment?:Express.Multer.File): Promise<IMessage | null>;
  getMessagesByChatId(chatId: string): Promise<IMessage[] | null>;
  updateMessage(messageId: string, body: string): Promise<IMessage | null>;
  deleteMessage(messageId: string): Promise<IMessage | null>
}