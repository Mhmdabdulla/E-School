import { Request, Response } from "express";
import { IInstructorController } from "./interfaces/IInstructorController";
import { IInstructorService } from "../services/interfaces/IInstructorService";
import {STATUS_CODES} from "../utils/constants"
import { inject, injectable } from "inversify";
import TYPES from "../di/types";
import { IInstructor } from "../models/instructor.model";


@injectable()
export class InstructorController implements IInstructorController {
  constructor(
    @inject(TYPES.InstructorService) private instructorService: IInstructorService
  ){}
  
  getAllInstructors = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.searchQuery as string)?.trim() || "";

    const instructorswithPagination = await this.instructorService.getAllInstructors(page, limit, search)
    res.status(STATUS_CODES.OK).json({ message: "instructors fetched successfully", instructorswithPagination });
  };

  getInstructorApplications = async (req: Request, res: Response): Promise<void> => {
    const instructorApplications = await this.instructorService.getInstructorApplications();
    res.status(STATUS_CODES.OK).json({ instructorApplications, message: "applications fetched successfully" });
  };

  reviewInstructor = async (req: Request, res: Response): Promise<void> => {
    const { instructorId } = req.params;
    const { status, reason } = req.body;
    await this.instructorService.reviewTutorApplication(instructorId, status, reason);
    res.status(STATUS_CODES.OK).json({ message: `instructor ${status} successfully` });
  };

  getUserApplications = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?._id;
    const applications = await this.instructorService.getUserApplications(userId as string);
    res.status(STATUS_CODES.OK).json({ applications, message: "applications fetched successfully" });
  };


  getInstructorProfile = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const instructor = await this.instructorService.getInstructorProfile(userId as string);
    res.status(STATUS_CODES.OK).json({ message: "instructor profile fetched successfully", instructor });
  };

  updateInstrucotrProfile = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const data: Partial<IInstructor> = req.body.data;
    console.log(data);
    const instructor = await this.instructorService.updateInstructorProfile(userId, data);
    res.status(STATUS_CODES.OK).json({ message: "instructor updated successfully", instructor });
  };


}