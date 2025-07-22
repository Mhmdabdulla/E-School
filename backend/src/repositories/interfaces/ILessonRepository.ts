import { ILesson } from "../../models/Lesson";
import { IBaseRepository } from "./IBaseRepository";

export interface ILessonRepository extends IBaseRepository<ILesson> {
    addLesson(moduleId: string, lessonData: Partial<ILesson>): Promise<ILesson>;
    getLessonsByModule(moduleId: string): Promise<ILesson[]>;
}