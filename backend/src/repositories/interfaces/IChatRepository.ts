import { IChat } from "../../models/Chat";
import { IBaseRepository } from "./IBaseRepository";

export interface IChatRepository extends IBaseRepository<IChat> {
  createChat(chat: Partial<IChat>): Promise<IChat>;
  findUserChats(userId: string): Promise<IChat[]>;
  findExistingChat(participants: string[]): Promise<IChat | null>
}