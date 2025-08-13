import { IUser } from "../models/user.model";
import { IUserService } from "./interfaces/IUserService";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { FilterQuery } from "mongoose";
import { inject, injectable } from "inversify";
import TYPES from "../di/types";
import { BaseService } from "./base.service";
import { IInstructor } from "../models/instructor.model";
import { IInstructorRepository } from "../repositories/interfaces/IInstructorRepository";
import { DashboardData, PaginatedUsersResponse } from "../types/userTypes";
import { STATUS_CODES } from "../utils/constants";
import { AppError } from "../utils/AppError";
import { IEnrollmentRepository } from "../repositories/interfaces/IEnrollmentRepository";
import { comparePassword, hashPassword } from "../utils/password";
import { GoogleAuthUserIdDTO, UserResponseDTO } from "../dto/response/user.response.dto";
import logger from "../config/logger";

@injectable()
export class UserService extends BaseService<IUser>  implements IUserService {

  constructor(
    @inject(TYPES.UserRepository) private userRepository:IUserRepository,
    @inject(TYPES.InstructorRepository) private instructorRepository:IInstructorRepository,
    @inject(TYPES.EnrollmentRepository) private enrollmentRepository:IEnrollmentRepository
  ){
    super(userRepository)
  }
    
  async getAllUsers(page: number, limit: number, searchQuery?: string): Promise<PaginatedUsersResponse | null> {
    const skip = (Number(page) - 1) * Number(limit);

    let filter: FilterQuery<IUser> = { role: "user" };
    if (searchQuery) {
      filter = {
        ...filter,
        $or: [{ name: { $regex: searchQuery, $options: "i" } }, { email: { $regex: searchQuery, $options: "i" } }],
      };
    }

    const totalUsers = await this.userRepository.countDocuments(filter);
    const users = await this.userRepository.findAllUsers(skip, limit, filter) ?? [];


    return {
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      users : users.map(UserResponseDTO.fromEntity)
    };
  }
    async findUserByGoogleId(googleId: string): Promise<GoogleAuthUserIdDTO | null> {
    const user = await this.userRepository.findUserByGoogleId(googleId);
    return GoogleAuthUserIdDTO.fromEntity(user);
  }

  async createGoogleUser(
    name: string,
    email: string,
    profileImageUrl: string,
    googleId: string
  ): Promise<GoogleAuthUserIdDTO | null> {
    const password = await hashPassword(Math.random().toString(36).substring(2, 10));
    const user = await this.userRepository.create({ name, email, profileImageUrl, googleId, password });
    if (!user) {
      throw new AppError("Unable to create user. Please try again.", STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
    return GoogleAuthUserIdDTO.fromEntity(user);
  }

  async becomeInstructor(instructorData: Partial<IInstructor>): Promise<IInstructor | null> {
    const existingInstructor = await this.instructorRepository.findInstructorByUserId(instructorData.userId as string);

    const existingInstructorStatus: any = existingInstructor?.adminApproval?.status;
    if (existingInstructorStatus === "pending") {
      logger.error("Your instructor application is already pending approval.");
      throw new AppError("Your instructor application is already pending approval.", STATUS_CODES.BAD_REQUEST);
    }

    const instructor = await this.instructorRepository.createInstructor(instructorData);

    if (!instructor) {
      logger.error("Unable to submit instructor application. Please try again.");
      throw new AppError("Unable to submit instructor application. Please try again.", STATUS_CODES.INTERNAL_SERVER_ERROR);
    }

    return instructor;
  }

  async updateUser(userId: string, updateData: Partial<IUser>): Promise<UserResponseDTO> {

      const user = await this.userRepository.updateById(userId, updateData);
      if (!user) {
        throw new AppError("cannot update user. please try again",STATUS_CODES.INTERNAL_SERVER_ERROR);
      }

      return UserResponseDTO.fromEntity(user);
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<IUser> {

      const user = await this.userRepository.findUserById(userId);
      if (!user) throw new AppError("invalid userId",STATUS_CODES.BAD_REQUEST);

      const isPasswordValid = await comparePassword(currentPassword, user.password);

      if (!isPasswordValid) throw new AppError("incorrect current password",STATUS_CODES.BAD_REQUEST);

      const hashedPassword = await hashPassword(newPassword);

      const updatedUser = await this.userRepository.updateById(userId, { password: hashedPassword });
      if (!updatedUser) {
        throw new AppError("cannot changed password. please try again",STATUS_CODES.INTERNAL_SERVER_ERROR);
      }
      return updatedUser;
  }

  async getUserProfile(userId: string): Promise<UserResponseDTO> {
    try {
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        throw new AppError("invalid userId",STATUS_CODES.BAD_REQUEST);
      }

      return UserResponseDTO.fromEntity(user);
    } catch (error) {
      console.error(error);
      throw new Error("error while fetching user");
    }
  }

  async getDashboardData(userId: string): Promise<DashboardData> {
    const enrollments = (await this.enrollmentRepository.findEnrollmentsByUser(userId)) ?? [];
    const instructors = (await this.enrollmentRepository.findDistinctInstructors(userId)).length;
    const enrolledCourses = enrollments?.length ?? 0;
    const coursesInProgress = enrollments?.filter((enroll) => !enroll.completed);
    const activeCourses = coursesInProgress?.length ?? 0;
    const completedCourses = enrollments?.filter((enroll) => enroll.completed).length ?? 0;

    return {
      enrolledCourses,
      activeCourses,
      completedCourses,
      instructors,
      enrollments: coursesInProgress?.slice(0, 4),
    };
  }

}