import { Request, Response } from "express";
import { IAdminController } from "../controllers/interfaces/IAdminController";
import { inject, injectable } from "inversify";
import { IAdminService } from "../services/interfaces/IAdminService";
import  TYPES  from "../di/types";
import { IInstructorService } from "../services/interfaces/IInstructorService";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class AdminController implements IAdminController {
  constructor(
    @inject(TYPES.AdminService) private adminService: IAdminService,
    @inject(TYPES.InstructorService)
    private instructorService: IInstructorService
  ) {}

  getDashboard = async (req: Request, res: Response): Promise<void> =>{
    const dashboardDetails = await this.adminService.getDashboardDetails()
    res.status(STATUS_CODES.OK).json({message:"dashboard details fetched successfully", dashboardDetails})
  }

//   getInstructors = async (req: Request, res: Response): Promise<void> => {
//     const instructors = await this.instructorService.getInstructors();
//     res.status(STATUS_CODES.OK).json({ message: "Instructors retrieved successfully.", instructors });
//   };
}