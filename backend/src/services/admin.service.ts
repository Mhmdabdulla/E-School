import { inject, injectable } from "inversify";
import { IAdminService } from "../services/interfaces/IAdminService";
import { IUser } from "../models/user.model";
import { IAdminRepository } from "../repositories/interfaces/IAdminRepository";
import  TYPES  from "../di/types";
import { IInstructorRepository } from "../repositories/interfaces/IInstructorRepository";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { AdminDashboardStats } from "../types/userTypes";
import { AppError } from "../utils/AppError";
import { STATUS_CODES } from "../utils/constants";
import { IOrderService } from "./interfaces/IOrderService";

@injectable()
export class AdminService implements IAdminService {
    constructor(
    @inject(TYPES.AdminRepository) private adminRepository:IAdminRepository,
    @inject(TYPES.InstructorRepository) private instructorRepository: IInstructorRepository,
    @inject(TYPES.UserRepository) private userRepository : IUserRepository,
    @inject(TYPES.OrderService) private orderService : IOrderService,
){}

  getDashboardDetails = async() :Promise<AdminDashboardStats>=>{
    const dashboardData = await this.userRepository.getAdminDashboardData();
    const totalRevenue = await this.orderService.getTotalRevenue();

    return {
      ...dashboardData,
      totalRevenue
    };
  }

    getUsers = async():Promise<IUser[]> =>{
    try {
        const users = await this.adminRepository.getUsers()
        return users
    } catch (error:any) {
        throw new AppError(error.message,STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
   }

    toggleUserStatus = async(userId:string):Promise<IUser| null> =>{
    try {
        const user = await this.adminRepository.toggleUserStatus(userId)
        return user 
    } catch (error:any) {
        throw new AppError(error.message,STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
   }

}