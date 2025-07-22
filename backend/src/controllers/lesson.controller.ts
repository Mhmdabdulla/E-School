import { inject, injectable } from "inversify";
import { ILessonController } from "./interfaces/ILessonController";
import { Request, Response } from "express";
import { ILessonService } from "../services/interfaces/ILessonService";
import { STATUS_CODES } from "../utils/constants";
import  TYPES  from "../di/types";
// import { extractUserFromRefreshToken } from "../utils/tokenServices";
import { ICourseService } from "../services/interfaces/ICourseService";
// import { IEnrollmentService } from "../core/interfaces/service/IEnrollmentService";
@injectable()
export class LessonController implements ILessonController {
  constructor(
    @inject(TYPES.LessonService) private lessonService: ILessonService,
    // @inject(TYPES.EnrollmentService) private enrollmentService: IEnrollmentService,
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
    res.status(STATUS_CODES.OK).json({ message: "lesson updated successfully", lesson });
  };

  deleteLesson = async (req: Request, res: Response) => {
    const { lessonId } = req.params;
     await this.lessonService.deleteLesson(lessonId);
    res.status(STATUS_CODES.OK).json({ message: "lesson delete successfully" });
  };

//   streamLesson = async (req: Request, res: Response): Promise<void> => {
//     const { lessonId } = req.params;
//     const user = extractUserFromRefreshToken(req.cookies.refreshToken);

//     if (!user) {
//       res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Unauthorized to access this route" });
//       return;
//     }
//     const userId = user?.userId;

//     const lesson = await this.lessonService.findById(lessonId);

//     // const enrollment = await this.enrollmentService.findOne({ userId, courseId: lesson?.courseId });

//     const isInstructor = await this.courseService.findOne({ _id: lesson?.courseId, instructorId: userId as string });
//     if (!enrollment && !isInstructor) {
//       res.status(STATUS_CODES.FORBIDDEN).json({ message: "you are not enrolled into this course" });
//       return;
//     }

//     const signedUrl = cloudinary.url(lesson?.videoPublicId as string, {
//       resource_type: "video",
//       type: "authenticated",
//       sign_url: true,
//       secure: true,
//       expires_at: Math.floor(Date.now() / 1000) + 60,
//     });

//     const range = req.headers.range;
//     if (!range) {
//       res.status(STATUS_CODES.BAD_REQUEST).send("Requires Range header");
//       return;
//     }

//     const videoResponse = await axios.get(signedUrl, {
//       headers: { Range: range },
//       responseType: "stream",
//     });

//     res.status(STATUS_CODES.PARTIAL_CONTENT);
//     res.set({
//       "Content-Type": "video/mp4",
//       "Content-Length": videoResponse.headers["content-length"],
//       "Content-Range": videoResponse.headers["content-range"],
//       "Accept-Ranges": "bytes",
//     });

//     videoResponse.data.pipe(res);
//   };
}