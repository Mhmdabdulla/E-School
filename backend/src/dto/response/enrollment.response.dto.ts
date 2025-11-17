export class EnrollmentResponseDTO {
  id!: string;
  course!: {
    id: string;
    title: string;
    subtitle: string;
    thumbnail: string;
    price: number;
    rating: number;
    isFree: boolean;
  };
  progress!: {
    totalLessons: number;
    completedLessonsCount: number;
    percentage: number;
    lastVisited: string | null;
  };
  enrolledAt!: Date;

  static fromEntity(enrollment: any): EnrollmentResponseDTO {
    const dto = new EnrollmentResponseDTO();

    dto.id = enrollment._id.toString();

    dto.course = {
      id: enrollment.courseId._id.toString(),
      title: enrollment.courseId.title,
      subtitle: enrollment.courseId.subtitle,
      thumbnail: enrollment.courseId.thumbnail,
      price: enrollment.courseId.price,
      rating: enrollment.courseId.rating,
      isFree: enrollment.courseId.isFree,
    };

    dto.progress = {
      totalLessons: enrollment.progress.totalLessons,
      completedLessonsCount: enrollment.progress.completedLessons?.length ?? 0,
      percentage: enrollment.progress.percentage,
      lastVisited: enrollment.progress.lastVisited
        ? enrollment.progress.lastVisited.toString()
        : null,
    };

    dto.enrolledAt = enrollment.enrolledAt;

    return dto;
  }

  static fromArray(enrollments: any[]): EnrollmentResponseDTO[] {
    return enrollments.map((e) => EnrollmentResponseDTO.fromEntity(e));
  }
}
