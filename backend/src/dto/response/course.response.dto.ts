// lesson.dto.ts
export interface LessonResponseDTO {
  _id: string;
  courseId:string;
  moduleId:string;
  title: string;
  description: string;
  contentType: string;
  videoPublicId: string | null;
  duration: string | null;
  order: number;
  attachments: any[];
  createdAt: Date;
  updatedAt: Date;
}




export interface ModuleResponseDTO {
  _id: string;
  courseId:string;
  title: string;
  description: string;
  order: number;
  lessons: LessonResponseDTO[];
  createdAt: Date;
  updatedAt: Date;
}


// instructor.dto.ts
export interface InstructorResponseDTO {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  profileImageUrl: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}




export interface CourseResponseDTO {
  _id: string;
  title: string;
  subtitle: string;
  categoryId: string;
  subCategoryId: string;
  categoryName: string;
  subCategoryName: string;
  language: string;
  level: string;
  duration: string | null;
  thumbnail: string;
  trailer: string;
  description: string;
  whatYouWillLearn: string[];
  welcomeMessage: string;
  congratulationsMessage: string;
  instructorId:string

  price: number;
  discountPrice: number;
  rating: number;
  enrollmentCount: number;
  isFree: boolean;
  isPublic: boolean;

  instructor: InstructorResponseDTO;
  modules: ModuleResponseDTO[];

  createdAt: Date;
  updatedAt: Date;
}


export interface CourseListItemDTO {
  _id: string;
  title: string;
  subtitle: string;

  categoryId: {
    id: string;
    name: string;
  };

  subCategoryId: string;

  language: string;
  level: string;

  thumbnail: string;
  trailer: string;

  description: string;

  whatYouWillLearn: string[];

  welcomeMessage: string;
  congratulationsMessage: string;

  instructorId: string;
  modules: [];

  status: boolean;
  isPublic: boolean;

  price: number;
  discountPrice: number;

  rating: number;
  enrollmentCount: number;
  isFree: boolean;

  createdAt: Date;
  updatedAt: Date;
}


export interface PaginatedCoursesDTO {
  totalCourses: number;
  totalPages: number;
  currentPage: number;
  courses: CourseListItemDTO[];
}

