import { RequestHandler } from "express";

export interface IChatController {
  createChat: RequestHandler;
  getChats: RequestHandler;
//   getChatById: RequestHandler;
}