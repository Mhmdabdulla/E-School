import { IChat } from "../../models/Chat";
import { IBaseService } from "./IBaseService";

export interface IChatService extends IBaseService<IChat> {
  createChat(userId: string, recieverId: string): Promise<IChat>;
  getUserChats(userId: string): Promise<IChat[]>;
  getChatById(chatId: string): Promise<IChat | null>;
}