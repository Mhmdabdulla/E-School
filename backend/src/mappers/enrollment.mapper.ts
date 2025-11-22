import { IEnrollment } from "../models/Enrollment";
import { EnrollmentResponseDTO } from "../dto/response/enrollment.response";

export function mapEnrollmentToDTO(enrollment: IEnrollment): EnrollmentResponseDTO {
  const course = enrollment.courseId as any;

  return {
    _id: String(enrollment._id),
    course: {
      _id: course._id.toString(),
      title: course.title,
      subtitle: course.subtitle,
      thumbnail: course.thumbnail,
      price: course.price,
      rating: course.rating,
      isFree: course.isFree,
    },
    progress: {
      totalLessons: enrollment.progress.totalLessons,
      completedLessonsCount: enrollment.progress.completedLessons.length,
      percentage: enrollment.progress.percentage,
      lastVisited: enrollment.progress.lastVisited
        ? enrollment.progress.lastVisited.toString()
        : null,
    },
    enrolledAt: enrollment.enrolledAt.toISOString(),
  };
}
