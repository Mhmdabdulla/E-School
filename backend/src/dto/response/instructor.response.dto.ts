// dto/response/instructor.response.dto.ts

export interface UserResponseDTO {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  profileImageUrl?: string;
  title?: string;
}

export interface EducationResponseDTO {
  highestDegree: string;
  institution: string;
  graduationYear: string;
  fieldOfStudy: string;
}

export interface SocialLinksResponseDTO {
  linkedin?: string;
  github?: string;
  portfolio?: string;
  twitter?: string;
  instagram?: string;
}

export interface AdminApprovalResponseDTO {
  status: "pending" | "approved" | "rejected";
  reason?: string;
}

export interface InstructorResponseDTO {
  _id: string;
  userId: UserResponseDTO;
  courses: string[];
  idCardImageUrl: string;

  education: EducationResponseDTO;

  experience: string;
  currentOccupation: string;

  skills: string[];
  preferredSubjects: string[];
  teachingLanguages: string[];

  phoneNumber?: string;
  countryCode?: string;
  bio: string;

  socialLinks?: SocialLinksResponseDTO;
  adminApproval: AdminApprovalResponseDTO;

  students: number;

  createdAt: Date;
  updatedAt: Date;
}

export interface InstructorApplicationResponseDTO {
  instructorApplications: InstructorResponseDTO[];
  message: string;
}

export interface PaginatedInstructorsResponseDTO {
  totalInstructors: number;
  totalPages: number;
  currentPage: number;
  instructors: InstructorResponseDTO[];
}












export class BecomeInstructorResponseDTO {
  id!: string;
  userId!: string;
  status!: "pending" | "approved" | "rejected";
  submittedAt!: Date;

  static fromEntity(instructor: any): BecomeInstructorResponseDTO {
    const dto = new BecomeInstructorResponseDTO();
    dto.id = instructor._id.toString();
    dto.userId = instructor.userId.toString();
    dto.status = instructor.adminApproval.status;
    dto.submittedAt = instructor.createdAt;
    return dto;
  }
}
