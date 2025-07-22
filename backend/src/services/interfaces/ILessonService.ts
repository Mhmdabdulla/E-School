import { ILesson } from "../../models/Lesson";
import { IBaseService } from "./IBaseService";

export interface ILessonService extends IBaseService<ILesson> {
    updateLesson(lessonId:string, data:Partial<ILesson>, file?:Express.Multer.File):Promise<ILesson | null>
    createLesson(data:Partial<ILesson>, file?:Express.Multer.File):Promise<ILesson |null>
    deleteLesson (lessonId:string):Promise<ILesson | null>
}