import { inject, injectable } from "inversify";
import { ILessonController } from "./interfaces/ILessonController";
import { Request, Response } from "express";
import { ILessonService } from "../services/interfaces/ILessonService";
import { STATUS_CODES } from "../utils/constants";
import TYPES from "../di/types";

import { ICourseService } from "../services/interfaces/ICourseService";

@injectable()
export class LessonController implements ILessonController {
  constructor(
    @inject(TYPES.LessonService) private lessonService: ILessonService,

    @inject(TYPES.CourseService) private courseService: ICourseService
  ) {}

  createLesson = async (req: Request, res: Response) => {
    console.log(req.body);
    const lessonData = req.body;
    const file = req.file ? req.file : undefined;

    const lesson = await this.lessonService.createLesson(lessonData, file);
    res.status(STATUS_CODES.CREATED).json(lesson);
  };

  updateLesson = async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    const data = req.body;
    const file = req.file ? req.file : undefined;

    const lesson = await this.lessonService.updateLesson(lessonId, data, file);
    res
      .status(STATUS_CODES.OK)
      .json({ message: "lesson updated successfully", lesson });
  };

  deleteLesson = async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    await this.lessonService.deleteLesson(lessonId);
    res.status(STATUS_CODES.OK).json({ message: "lesson delete successfully" });
  };


}
