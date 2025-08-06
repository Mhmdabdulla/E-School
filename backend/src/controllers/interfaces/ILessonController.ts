import { RequestHandler } from "express";

export interface ILessonController {
  createLesson: RequestHandler;
  updateLesson: RequestHandler;
  deleteLesson: RequestHandler;
  streamLesson: RequestHandler;
}