import { Request, Response } from "express";
import { IEnrollmentController } from "./interfaces/IEnrollmentController";
import { inject, injectable } from "inversify";
import  TYPES  from "../di/types";
import { IEnrollmentService } from "../services/interfaces/IEnrollmentService";
import { STATUS_CODES } from "../utils/constants";


@injectable()
export class EnrollmentController implements IEnrollmentController{
    constructor(
        @inject(TYPES.EnrollmentService) private enrollmentService:IEnrollmentService,
       
    ){}



    enroll = async(req: Request, res:Response) :Promise<void> => {
        const userId = req.user?._id as string
        const { courseId } = req.body;
         await this.enrollmentService.enrollUserInCourses(userId, [courseId]);
         const enrollment = await this.enrollmentService.isUserEnrolled(userId, courseId)
        res.status(STATUS_CODES.OK).json({ message: "Enrollment successful" , enrollment});
    }


}