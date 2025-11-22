// dto/mapper/instructor.mapper.ts


import {
  InstructorResponseDTO,
  UserResponseDTO,
} from "../dto/response/instructor.response.dto";

export class InstructorMapper {
  static toUserDTO(user: any): UserResponseDTO {
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profileImageUrl: user.profileImageUrl,
      title: user.title,
    };
  }

  static toInstructorDTO(instructor: any): InstructorResponseDTO {
    return {
      _id: instructor._id.toString(),
      userId: this.toUserDTO(instructor.userId),
      courses: instructor.courses?.map((c: any) => c.toString()) ?? [],
      idCardImageUrl: instructor.idCardImageUrl,

      education: { ...instructor.education },

      experience: instructor.experience,
      currentOccupation: instructor.currentOccupation,

      skills: instructor.skills,
      preferredSubjects: instructor.preferredSubjects,
      teachingLanguages: instructor.teachingLanguages,

      phoneNumber: instructor.phoneNumber,
      countryCode: instructor.countryCode,
      bio: instructor.bio,

      socialLinks: instructor.socialLinks,

      adminApproval: {
        status: instructor.adminApproval.status,
        reason: instructor.adminApproval.reason,
      },

      students: instructor.students,

      createdAt: instructor.createdAt,
      updatedAt: instructor.updatedAt,
    };
  }

  static toInstructorListDTO(instructors: any[]): InstructorResponseDTO[] {
    return instructors.map((i) => this.toInstructorDTO(i));
  }
}
