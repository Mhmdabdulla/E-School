import { CourseResponseDTO } from "../dto/response/course.response.dto";

export const mapCourseToDTO = (course: any): CourseResponseDTO => {
  return {
    _id: course._id.toString(),
    title: course.title,
    subtitle: course.subtitle,
    categoryId: course.categoryId,
    subCategoryId: course.subCategoryId,
    categoryName: course.categoryName,
    subCategoryName: course.subCategoryName,
    language: course.language,
    level: course.level,
    duration: course.duration,
    thumbnail: course.thumbnail,
    trailer: course.trailer,
    description: course.description,

    whatYouWillLearn: course.whatYouWillLearn,

    welcomeMessage: course.welcomeMessage,
    congratulationsMessage: course.congratulationsMessage,
    instructorId:course.instructorId,

    price: course.price,
    discountPrice: course.discountPrice,
    rating: course.rating,
    enrollmentCount: course.enrollmentCount,
    isFree: course.isFree,
    isPublic: course.isPublic,

    instructor: {
      _id: course.instructor._id.toString(),
      name: course.instructor.name,
      email: course.instructor.email,
      role: course.instructor.role,
      status: course.instructor.status,
      profileImageUrl: course.instructor.profileImageUrl,
      title: course.instructor.title,
      createdAt: course.instructor.createdAt,
      updatedAt: course.instructor.updatedAt
    },

    modules: course.modules.map((module: any) => ({
      _id: module._id.toString(),
      courseId: module.courseId,
      title: module.title,
      description: module.description,
      order: module.order,
      createdAt: module.createdAt,
      updatedAt: module.updatedAt,
      lessons: module.lessons.map((lesson: any) => ({
        _id: lesson._id.toString(),
        courseId:lesson.courseId,
        moduleId:lesson.moduleId,
        title: lesson.title,
        description: lesson.description,
        contentType: lesson.contentType,
        videoPublicId: lesson.videoPublicId,
        duration: lesson.duration,
        order: lesson.order,
        attachments: lesson.attachments,
        createdAt: lesson.createdAt,
        updatedAt: lesson.updatedAt,
      }))
    })),

    createdAt: course.createdAt,
    updatedAt: course.updatedAt
  };
};


import { CourseListItemDTO, PaginatedCoursesDTO } from "../dto/response/course.response.dto";

export const mapCourseToListDTO = (course: any): CourseListItemDTO => {
  return {
    _id: course._id.toString(),
    title: course.title,
    subtitle: course.subtitle,

    categoryId: {
      id: course.categoryId?._id?.toString() || "",
      name: course.categoryId?.name || "",
    },

    subCategoryId: course.subCategoryId?.toString(),

    language: course.language,
    level: course.level,

    thumbnail: course.thumbnail,
    trailer: course.trailer,
    description: course.description,

    whatYouWillLearn: course.whatYouWillLearn,

    welcomeMessage: course.welcomeMessage,
    congratulationsMessage: course.congratulationsMessage,

    instructorId: course.instructorId?.toString(),
    modules:course.modules,

    status: course.status,
    isPublic: course.isPublic,

    price: course.price,
    discountPrice: course.discountPrice,

    rating: course.rating,
    enrollmentCount: course.enrollmentCount,
    isFree: course.isFree,

    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
  };
};

export const mapPaginatedCourses = (
  pagination: any
): PaginatedCoursesDTO => {
  return {
    totalCourses: pagination.totalCourses,
    totalPages: pagination.totalPages,
    currentPage: pagination.currentPage,
    courses: pagination.courses.map((course: any) =>
      mapCourseToListDTO(course)
    ),
  };
};
