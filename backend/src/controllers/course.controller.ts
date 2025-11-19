import { inject, injectable } from "inversify";
import { ICourseController } from "./interfaces/ICourseController";
import { Request, Response } from "express";
import { STATUS_CODES } from "../utils/constants";
import  TYPES  from "../di/types";
import { ICourseService } from "../services/interfaces/ICourseService";
import { ICourse } from "../models/Course";

@injectable()
export class CourseController implements ICourseController {
  constructor(@inject(TYPES.CourseService) private courseService: ICourseService) {}

  createCourse = async (req: Request, res: Response): Promise<void> => {
    const courseData = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    courseData.instructorId = req.user?._id;
    const thumbnailMimeType = files["thumbnail"]?.[0]?.mimetype;
    const trailerMimeType = files["trailer"]?.[0]?.mimetype;
 

    const course = await this.courseService.createCourse(courseData, files,thumbnailMimeType,trailerMimeType);
    res.status(STATUS_CODES.CREATED).json(course);
  };

  getMyCourses = async (req: Request, res: Response) => {
    const { page, limit, searchQuery, category, subCategory, sortBy } = req.query;
    const instructorId = req.user?._id;
    const coursesWithPagination = await this.courseService.getMycourses(
      {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        search: (searchQuery as string) || "",
        category: (category as string) || "",
        subCategory: (subCategory as string) || "",
        sortBy: (sortBy as string) || "createdAt",
      },
      instructorId as string
    );
    res.status(STATUS_CODES.OK).json({ message: "courses fetched successfully", coursesWithPagination });
    // const courses = await this.courseService.getCoursesByInstructorId(userId as string)
    // res.status(STATUS_CODES.OK).json(courses)
  };

  updatePublishStatus = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const course = await this.courseService.updatePublishStatus(courseId);
    res.status(STATUS_CODES.OK).json({ message: "course updated successfully", course });
  };

  getAllCourses = async (req: Request, res: Response) => {
    const { page, limit, sortBy, sortOrder, category, subCategory, searchQuery } = req.query;
    const coursesWithPagination = await this.courseService.getAllCourses({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      sortBy: (sortBy as string) || "createdAt",
      searchQuery: (searchQuery as string) || "",
      subCategory: (subCategory as string[]) || ["all"],
    });

    res.status(STATUS_CODES.OK).json({ message: "courses fetched successfully", coursesWithPagination });
  };

  getCourseWithContent = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const course = await this.courseService.getFullCourse(courseId);
    res.status(STATUS_CODES.OK).json(course);
  };

  updateCourse = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const data = req.body;
    const files = req.files ? (req.files as { [fieldname: string]: Express.Multer.File[] }) : undefined;
    

    const _currentCourse:ICourse | null = await this.courseService.findById(courseId);

if (data?.title && data?.title !== _currentCourse?.title) {
  const _course:ICourse | null = await this.courseService.findOne({ title: data.title });
  if (_course && _course?._id !== courseId) {
    res.status(STATUS_CODES.CONFLICT).json({ message: "course name already exists" });
    return;
  }
}
    const course = await this.courseService.updateCourse(courseId, data, files);
    res.status(STATUS_CODES.OK).json({ message: "course updated successfully", course });
  };

  getAllcoursesForAdmin = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.searchQuery as string)?.trim() || "";

    const coursesWithPagination = await this.courseService.getAllCoursesForAdmin(page, limit, search)
    res.status(STATUS_CODES.OK).json({ message: "course updated successfully", coursesWithPagination })
  };

  getMyActiveCourseCount = async (req: Request, res: Response): Promise<void> => {
    const instructorId = req.user?._id as string
    const activeCoursesCount = await this.courseService.ActiveCourseCount({instructorId, isPublic: true})
    res.status(STATUS_CODES.OK).json({message: "active course count of a instructor", activeCourses: activeCoursesCount})
  }

  toggleStatus = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const updatedCourse = await this.courseService.toggleStatus(courseId)
    res.status(STATUS_CODES.OK).json({ message: "Course status updated", updatedCourse });
  };
}