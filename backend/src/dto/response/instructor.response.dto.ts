











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
