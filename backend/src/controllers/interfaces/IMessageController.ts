import { RequestHandler } from "express";

export interface IMessageController {
  createMessage: RequestHandler;
  getMessages: RequestHandler;
  updateMessage:RequestHandler;
  deleteMessage:RequestHandler;
}