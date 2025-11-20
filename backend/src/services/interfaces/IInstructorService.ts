import { InstructorResponseDTO, PaginatedInstructorsResponseDTO } from "../../dto/response/instructor.response.dto";
import { IInstructor } from "../../models/instructor.model";



export interface IInstructorService {
  getInstructorApplications(): Promise<InstructorResponseDTO[] | null>;
//   getInstructors(): Promise<IInstructor[] | null>;
  getInstructorProfile(instructorId: string): Promise<InstructorResponseDTO>;
  updateInstructorProfile(instructorId: string, data: Partial<IInstructor>): Promise<IInstructor | null>;
  getUserApplications(userId: string): Promise<InstructorResponseDTO[]>;
  reviewTutorApplication(tutorId: string, status: string, reason?: string): Promise<IInstructor | null>;
  getEnrolledInstructors(
    userId: string,
    page: number,
    limit: number,
    searchQuery?: string
  ): Promise<PaginatedInstructorsResponseDTO >;
  getAllInstructors(page: number, limit: number, searchQuery?: string): Promise<PaginatedInstructorsResponseDTO | null>;
}