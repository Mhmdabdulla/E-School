import { Request, Response } from "express";
import { IEnrollmentController } from "./interfaces/IEnrollmentController";
import { inject, injectable } from "inversify";
import  TYPES  from "../di/types";
import { IEnrollmentService } from "../services/interfaces/IEnrollmentService";
import { STATUS_CODES } from "../utils/constants";
import { ICourseService } from "../services/interfaces/ICourseService";


@injectable()
export class EnrollmentController implements IEnrollmentController{
    constructor(
        @inject(TYPES.EnrollmentService) private enrollmentService:IEnrollmentService,
        @inject (TYPES.CourseService) private courseService: ICourseService,
       
    ){}



    enroll = async(req: Request, res:Response) :Promise<void> => {
        const userId = req.user?._id as string
        const { courseId } = req.body;
         await this.enrollmentService.enrollUserInCourses(userId, [courseId]);
         const enrollment = await this.enrollmentService.isUserEnrolled(userId, courseId)
        res.status(STATUS_CODES.OK).json({ message: "Enrollment successful" , enrollment});
    }

    isUserEnrolled= async(req:Request, res:Response) : Promise<void> =>{
        const userId = req.user?._id as string
        const courseId = req.params.courseId as string

        const userEnrolled = await this.enrollmentService.isUserEnrolled(userId, courseId)
        res.status(STATUS_CODES.OK).json({userEnrolled})
        
    }

    completeLesson = async(req:Request, res:Response) : Promise<void> => {
        const { lessonId } = req.body;
        const { courseId} = req.params
        const userId = req.user?._id;
        const enrollment = await this.enrollmentService.completeLesson(userId as string, courseId, lessonId);
        res.status(STATUS_CODES.OK).json({message:"lesson completed succeefully", enrollment});
    }

    getEnrolledCourses= async(req: Request, res:Response) :Promise<void> => {        
        const userId = req.user?._id;
        const {
            page = "1",
            limit = "10",
            search = "",
            filter = "all",
          } = req.query;
        
          const pageNumber = parseInt(page as string, 10);
          const limitNumber = parseInt(limit as string, 10);


         const enrollments = await this.enrollmentService.getUserEnrollments({
    page: pageNumber,
    limit: limitNumber,
    search: search as string,
    filter: filter as string,
  }, userId as string);  
  
        res.status(STATUS_CODES.OK).json({message:"enrollment fetched succeefully",enrollments});
    }

    getOneEnrolledCourse = async(req: Request, res:Response) :Promise<void> => {
        const userId = req.user?._id
        const {courseId} = req.params
        const enrolledCourse = await this.enrollmentService.findOne({userId,courseId})
        const courseWithModulesAndLessons = await this.courseService.getFullCourse(courseId)

        res.status(STATUS_CODES.OK).json({message:"enrolled course fetched successfully", enrolledCourse, courseWithModulesAndLessons})
    }

    updateLastVisitedLesson = async(req: Request, res:Response) :Promise<void> =>{
        const userId = req.user?._id
        const { lessonId} = req.body
        const { courseId} = req.params
        const enrollment = await this.enrollmentService.updateLastVisitedLesson({userId, courseId}, lessonId)

        res.status(STATUS_CODES.OK).json({message: "last visited lesson updated successfully", enrollment})
    }

    getEnrolledStudentsOfACourse = async(req: Request, res:Response) :Promise<void> =>{
        const { courseId} = req.params
        const enrolledStudents = await this.enrollmentService.getEnrolledStudentsOfACourse(courseId)
        res.status(STATUS_CODES.OK).json({message: "enrolled users fetched succeefully", enrolledStudents})
    }

    getInstructorStats = async(req: Request, res:Response) :Promise<void> =>{
        const instructorId = req.user?._id as string
        const enrollmentStats = await this.enrollmentService.getInstructorStats(instructorId);
        res.status(200).json({message: "enrollment stats fetched succeefully",enrollmentStats });
    }


}