import { inject, injectable } from "inversify";
import { BaseService } from "./base.service";
import { ILessonService } from "./interfaces/ILessonService";
import { ILesson} from "../models/Lesson";
import  TYPES  from "../di/types";
import { ILessonRepository } from "../repositories/interfaces/ILessonRepository";
import { deleteFileFromS3, uploadVideoToS3 } from "../utils/s3Services";
import { AppError } from "../utils/AppError";

@injectable()
export class LessonService extends BaseService<ILesson> implements ILessonService {
  constructor(@inject(TYPES.LessonRepository) private lessonRepository: ILessonRepository) {
    super(lessonRepository);
  }

  async updateLesson(lessonId: string, data: Partial<ILesson>, file?: Express.Multer.File): Promise<ILesson | null> {
    const existingLesson = await this.lessonRepository.findById(lessonId);
    if(!existingLesson){
        throw new Error("cannot find lesson. please try again")
    }
    if (file) {
    await deleteFileFromS3(existingLesson.videoUrl as string)
    const videoData = await uploadVideoToS3(file.buffer, "course/lesson", file.mimetype)
      data.videoUrl = videoData?.url
      data.videoPublicId = videoData?.key
      data.duration = Math.floor(Number(videoData?.duration)).toString()
    }

    return await this.lessonRepository.update(lessonId, data)
  }

  async createLesson(data:Partial<ILesson>, file?:Express.Multer.File):Promise<ILesson |null> {
    
    if(!file){
        throw new AppError("please provide the file for creating a lesson")
    }

    const videoData = await uploadVideoToS3(file?.buffer, 'course/lesson',file?.mimetype)
     data.videoPublicId = videoData?.key
     data.duration = Math.floor(Number(videoData?.duration)).toString()
     return await this.lessonRepository.create(data)
  }

  async deleteLesson (lessonId:string):Promise<ILesson | null>{
    const lesson = await this.lessonRepository.findById(lessonId)
    if(!lesson){
        throw new Error("cannot find the lesson, please try again")
    }

    await deleteFileFromS3(lesson.videoPublicId as string)
    return await this.lessonRepository.delete(lessonId)
  }
}