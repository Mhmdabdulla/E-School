import { IInstructorService } from "./interfaces/IInstructorService";
import { IInstructorRepository } from "../repositories/interfaces/IInstructorRepository";

import { inject, injectable } from "inversify";
import TYPES from "../di/types";
import { IInstructor } from "../models/instructor.model";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import { PaginatedInstructorsResponse } from "../types/userTypes";
import { AppError } from "../utils/AppError";
import { STATUS_CODES } from "../utils/constants";
import { IEnrollmentRepository } from "../repositories/interfaces/IEnrollmentRepository";

@injectable()
export class InstructorService implements IInstructorService {
  constructor(
    @inject(TYPES.InstructorRepository)
    private instructorRepository: IInstructorRepository,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.EnrollmentRepository) private enrollmentRepository: IEnrollmentRepository
  ) {}

  async getAllInstructors(
    page: number,
    limit: number,
    searchQuery?: string
  ): Promise<PaginatedInstructorsResponse | null> {
    const skip = (Number(page) - 1) * Number(limit);

    const instructors = await this.instructorRepository.findAllInstructors(
      skip,
      limit,
      searchQuery
    );

    const totalInstructors = await this.instructorRepository.countDocuments({
      "adminApproval.status": "approved",
    });
    return {
      totalInstructors,
      totalPages: Math.ceil(totalInstructors / limit),
      currentPage: page,
      instructors,
    };
  }

  async getInstructorApplications(): Promise<IInstructor[] | null> {
    const instructorApplications =
      await this.instructorRepository.getInstructorApplications();
    if (!instructorApplications)
      throw new AppError(
        "No instructor applications found",
        STATUS_CODES.NOT_FOUND
      );

    return instructorApplications;
  }

  reviewTutorApplication = async (
    tutorId: string,
    status: string,
    reason?: string
  ): Promise<IInstructor | null> => {
    if (!["approved", "rejected"].includes(status)) {
      throw new AppError(
        "Invalid status. Must be 'approved' or 'rejected'.",
        STATUS_CODES.BAD_REQUEST
      );
    }

    const updatedInstructor =
      await this.instructorRepository.updateInstructorStatus(tutorId, {
        "adminApproval.status": status,
        "adminApproval.reason": reason ? reason : "",
      });

    if (!updatedInstructor) {
      throw new AppError("Instructor not found", STATUS_CODES.NOT_FOUND);
    }

    const InstructorStatus: any = updatedInstructor.adminApproval.status;

    if (InstructorStatus === "approved") {
      const instructor = await this.userRepository.updateById(
        updatedInstructor.userId as string,
        { role: "instructor" }
      );
      if (!instructor) {
        throw new AppError("Associated user not found", STATUS_CODES.NOT_FOUND);
      }
    }

    return updatedInstructor;
  };

  async getUserApplications(userId: string): Promise<IInstructor[] | null> {
    const applications =
      await this.instructorRepository.getUserApplications(userId);
    if (!applications) {
      throw new Error("no applications found");
    }
    return applications;
  }

  async getInstructorProfile(
    instructorId: string
  ): Promise<IInstructor | null> {
    const instructor =
      await this.instructorRepository.getInstructorProfile(instructorId);
    if (!instructor) {
      throw new Error("instructor not found ");
    }
    return instructor;
  }

  async updateInstructorProfile(
    instructorId: string,
    data: Partial<IInstructor>
  ): Promise<IInstructor | null> {
    return await this.instructorRepository.updateInstructorProfile(
      instructorId,
      data
    );
  }

  async getEnrolledInstructors(
    userId: string,
    page: number,
    limit: number,
    searchQuery?: string
  ): Promise<PaginatedInstructorsResponse | null> {
    const instructorIds = await this.enrollmentRepository.findDistinctInstructors(userId);

    const skip = (Number(page) - 1) * Number(limit);

    const instructors = await this.instructorRepository.findInstructorsByUserId(
      instructorIds,
      skip,
      limit,
      searchQuery
    );

    return {
      totalInstructors: instructorIds.length,
      totalPages: Math.ceil(instructorIds.length / limit),
      currentPage: page,
      instructors,
    };
  }


}
