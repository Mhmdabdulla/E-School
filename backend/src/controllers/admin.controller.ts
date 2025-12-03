import { Request, Response } from "express";
import { IAdminController } from "../controllers/interfaces/IAdminController";
import { inject, injectable } from "inversify";
import { IAdminService } from "../services/interfaces/IAdminService";
import  TYPES  from "../di/types";
import { IInstructorService } from "../services/interfaces/IInstructorService";
import { STATUS_CODES } from "../utils/constants";
import { IOrderService } from "../services/interfaces/IOrderService";

@injectable()
export class AdminController implements IAdminController {
  constructor(
    @inject(TYPES.AdminService) private adminService: IAdminService,
    @inject(TYPES.InstructorService)
    private instructorService: IInstructorService,
    @inject(TYPES.OrderService) private orderService: IOrderService
  ) {}

  getDashboard = async (req: Request, res: Response): Promise<void> =>{
    const dashboardDetails = await this.adminService.getDashboardDetails()
    res.status(STATUS_CODES.OK).json({message:"dashboard details fetched successfully", dashboardDetails})
  }

//   getInstructors = async (req: Request, res: Response): Promise<void> => {
//     const instructors = await this.instructorService.getInstructors();
//     res.status(STATUS_CODES.OK).json({ message: "Instructors retrieved successfully.", instructors });
//   };

 getMonthlyRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const currentYear = new Date().getFullYear();
    const revenueData = await this.orderService.getMonthlyRevenue(currentYear);

    // Months array → Jan = 1, Feb = 2...Dec = 12
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      revenue: 0
    }));

    // Fill real revenue
    revenueData.forEach(r => {
      months[r.month - 1].revenue = r.revenue;
    });

    res.status(STATUS_CODES.OK).json({
      success: true,
      year: currentYear,
      revenue: months
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

}