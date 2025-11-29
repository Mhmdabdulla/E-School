import { inject, injectable } from "inversify";
import { BaseService } from "./base.service";
import { ICourseService } from "./interfaces/ICourseService";
import { ICourse } from "../models/Course";
import  TYPES  from "../di/types";
import { ICourseRepository } from "../repositories/interfaces/ICourseRepository";
import { uploadImageToS3,uploadVideoToS3,deleteFileFromS3 } from "../utils/s3Services";
import { PaginatedCoursesResponse } from "../types/userTypes";
import { FilterQuery } from "mongoose";
import { AppError } from "../utils/AppError";
import { CourseResponseDTO, PaginatedCoursesDTO } from "../dto/response/course.response.dto";
import { mapCourseToDTO, mapPaginatedCourses } from "../mappers/course.mapper";

@injectable()
export class CourseService extends BaseService<ICourse> implements ICourseService {
    constructor(@inject(TYPES.CourseRepository) private courseRepository: ICourseRepository) {
        super(courseRepository);
    }
  async createCourse(courseData: Partial<ICourse>, files:{ [fieldname: string]: Express.Multer.File[] },thumbnailMimeType:string,trailerMimeType:string): Promise<ICourse | null> {

    if(!files)
        throw new Error("files must be provided for creating a course")

        const thumbnail = await uploadImageToS3(files.thumbnail[0].buffer,'course/thumbnail',thumbnailMimeType)
        const trailerData = await uploadVideoToS3(files.trailer[0].buffer, 'course/trailer',trailerMimeType)

        courseData.thumbnail = thumbnail as string
        courseData.trailer = trailerData?.url as string
        
    return await this.courseRepository.create(courseData);
  }

 async getCoursesByInstructorId(instructorId: string): Promise<ICourse[] | null> {
     return await this.courseRepository.getCoursesByInstructorId(instructorId)
 }

async getMycourses({page=1, limit=12, search='', category='', subCategory='', sortBy='createdAt' }:
     { page: number; limit: number; search: string; category: string; subCategory: string; sortBy: string },
      instructorId:string): Promise<PaginatedCoursesResponse | null> {
    const skip = (page - 1) * limit
    const perPage = limit

    const filter:any = {};
    filter.instructorId = instructorId
    
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } }, 
            // { description: { $regex: search, $options: 'i' } } 
        ];
    }

    if(category){
        if(category === 'all'){
            filter.categoryId = {$exists: true}
        }else{
        filter.categoryId = category
        }
    }

    if(subCategory){
        if(subCategory === 'all'){
            filter.subCategoryId = {$exists: true}
        }
        else{
            filter.subCategoryId = subCategory
        }
    }

    const sort: any = {};
    switch (sortBy) {
      case 'price-high':
        sort.price = -1;  
        break;
      case 'price-low':
        sort.price = 1;  
        break;
      case 'latest':
        sort.createdAt = -1; 
        break;
      case 'oldest':
        sort.createdAt = 1; 
        break;
      case 'rating':
        sort.rating = -1;    
        break;
      default:
        sort.createdAt = -1; 
    }

     const courses = await this.courseRepository.getAllCourses(filter, skip, perPage, sort )
     const totalCourses = await this.courseRepository.getCoursescount(filter)

     return {
         totalCourses,
         totalPages: Math.ceil(totalCourses / perPage),
         currentPage: page,
         courses
       };
 }

 async updatePublishStatus(courseId: string): Promise<ICourse > {
     const course = await this.courseRepository.updateCoursePublishStatus(courseId)
     if(!course)
      throw new Error("cannot update course. please try agina")

    return course
 }

 async getAllCourses({page=1, limit=12, searchQuery='', sortBy='createdAt', subCategory = ['all'],  }): Promise<PaginatedCoursesDTO> {
    const skip = (page - 1) * limit
  const perPage = limit

  const filter:any = {};
  filter.isPublic = true
  filter.status = true
  if (searchQuery) {
    filter.$or = [
      { title: { $regex: searchQuery, $options: 'i' } }, 
    //   { description: { $regex: searchQuery, $options: 'i' } } 
    ];
  }
    if(subCategory.length > 0 && subCategory[0] !== 'all'){
        filter.subCategoryId = { $in: subCategory };
    }

  // Build sort
  const sort:any = {};
  switch(sortBy){
    case'price-desc' :
        sort.price = -1
        break
    case 'price-asc':
        sort.price = 1
        break   
    case 'trending':
        sort.enrollmentCount = -1
        break;
    case 'popular':
        sort.rating = -1    
        break
    case 'rating':
        sort.rating = -1    
        break
    case 'newest':
        sort.createdAt = -1 
        break
    default:
        sort.createdAt = -1        
  }

    const courses = await this.courseRepository.getAllCourses(filter, skip, perPage, sort )
    const totalCourses = await this.courseRepository.getCoursescount(filter)

    const paginated =  {
        totalCourses,
        totalPages: Math.ceil(totalCourses / perPage),
        currentPage: page,
        courses
      };

      return mapPaginatedCourses(paginated);


 }

 async getFullCourse(courseId: string): Promise<CourseResponseDTO | null> {
     const course = await this.courseRepository.getCourseWithModulesAndLessons(courseId)
     if(!course)
      throw new Error("cannot find course. please try again")

     return mapCourseToDTO(course);
 }

 async updateCourse(courseId:string,data:Partial<ICourse> , files?:{ [fieldname: string]: Express.Multer.File[] }) : Promise<ICourse | null> {
    const existingCourse = await this.courseRepository.findById(courseId)

    if(!existingCourse){
        throw new AppError("cannot find the course. please try again")
    }

    

    if (files?.thumbnail && files.thumbnail.length > 0) {
      const thumbnailMimeType = files["thumbnail"]?.[0]?.mimetype
      await deleteFileFromS3(existingCourse?.thumbnail as string)
      data.thumbnail = await uploadImageToS3(files.thumbnail[0].buffer, 'course/thumbnail',thumbnailMimeType) as string
    
    }

    if(files?.trailer && files.trailer.length > 0){
      await deleteFileFromS3(existingCourse?.trailer as string)
      const trailerMimeType = files["trailer"]?.[0]?.mimetype 
      const trailerData = await uploadVideoToS3(files.trailer[0].buffer, 'course/trailer',trailerMimeType)
      data.trailer = trailerData?.url 
    }

    return  await this.courseRepository.findByIdAndUpdate(courseId,data )
 }

 async getAllCoursesForAdmin(page: number, limit: number, searchQuery?: string): Promise<PaginatedCoursesDTO | null> {
  const skip = (Number(page) - 1) * Number(limit);

  const filter:FilterQuery<ICourse> = {};

  if (searchQuery) {
    const regex = new RegExp(searchQuery, 'i'); 
    filter.$or = [
      { title: { $regex: regex } },
      { description: { $regex: regex } },
      { "categoryId.name": { $regex: regex } }, 
      { "instructorId.name": { $regex: regex } }, 
    ];
  }

  const courses = await this.courseRepository.getAllCoursesForAdmin(skip, limit, filter)
  const totalCourses = await this.courseRepository.countDocuments({})
  const paginated =  {
        totalCourses,
        totalPages: Math.ceil(totalCourses / limit),
        currentPage: page,
        courses
      };

      return mapPaginatedCourses(paginated);
 }

 async ActiveCourseCount(filter:FilterQuery<ICourse>): Promise<number> {
  return await this.courseRepository.count(filter);
  }

//  async toggleCourseStatus(courseId: string) {
//   return this.courseRepository.toggleCourseStatus(courseId);
// }
}