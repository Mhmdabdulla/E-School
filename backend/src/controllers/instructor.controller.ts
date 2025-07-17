import { Request, Response } from "express";
import { IInstructorController } from "./interfaces/IInstructorController";
import { IInstructorService } from "../services/interfaces/IInstructorService";
import {STATUS_CODES} from "../utils/constants"
import { inject, injectable } from "inversify";
import TYPES from "../di/types";
// import { IInstructor } from "../models/Instructor";

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

}