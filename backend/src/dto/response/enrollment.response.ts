export interface EnrollmentResponseDTO {
  _id: string;
  course: {
    _id: string;
    title: string;
    subtitle: string;
    thumbnail: string;
    price: number;
    rating: number;
    isFree: boolean;
  };
  progress: {
    totalLessons: number;
    completedLessonsCount: number;
    percentage: number;
    lastVisited: string | null;
  };
  enrolledAt: string;
}
