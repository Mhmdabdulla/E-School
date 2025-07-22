import mongoose, { FilterQuery } from "mongoose";
import { BaseRepository } from "./base.repository";
import { ICourseRepository } from "./interfaces/ICourseRepository";
import { Course, ICourse } from "../models/Course";

export class CourseRepository extends BaseRepository<ICourse> implements ICourseRepository {
  constructor() {
    super(Course);
  }

  async getCoursesByInstructorId(instructorId: string): Promise<ICourse[] | null> {
    return await Course.find({ instructorId });
  }

  async updateCoursePublishStatus(courseId: string): Promise<ICourse | null> {
    return await Course.findByIdAndUpdate(
      courseId,
      [
        {
          $set: {
            isPublic: {
              $cond: { if: { $eq: ["$isPublic", true] }, then: false, else: true },
            },
          },
        },
      ],
      { new: true }
    );
  }

  async getAllCourses(filter: any, skip: any, limit: any, sort: any): Promise<ICourse[] | null> {
    return await Course.find(filter).skip(skip).limit(limit).sort(sort).populate({
      path: "categoryId",
      select: "name",
    });
  }

  async getAllCoursesForAdmin(skip: number, limit: number, filter: FilterQuery<ICourse>): Promise<ICourse[] | null> {
    return await Course.find(filter)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "categoryId",
        select: "name",
      })
      .populate({
        path: "instructorId",
        select: "name email profileImageUrl",
      });
  }

  async getCoursescount(filter: any): Promise<number> {
    return await Course.countDocuments(filter);
  }

  async getCoursesByIds(courseIds: string[]): Promise<ICourse[] | null> {
    return await Course.find({ _id: { $in: courseIds } });
  }
  async getCourseWithModulesAndLessons(courseId: string): Promise<ICourse | null> {
    const result = await Course.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(courseId) } },

      {
        $lookup: {
          from: "modules",
          localField: "_id",
          foreignField: "courseId",
          as: "modules",
        },
      },

      {
        $unwind: {
          path: "$modules",
          preserveNullAndEmptyArrays: true,
        },
      },

      // {
      //   $lookup: {
      //     from: "lessons",
      //     localField: "modules._id",
      //     foreignField: "moduleId",
      //     as: "modules.lessons",
      //   },
      // },

      {
        $lookup: {
          from: "lessons",
          let: { moduleId: "$modules._id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$moduleId", "$$moduleId"] } } },
            {
              $project: {
                videoUrl: 0,
              },
            },
          ],
          as: "modules.lessons",
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "instructorId",
          foreignField: "_id",
          as: "instructor",
        },
      },

      {
        $unwind: {
          path: "$instructor",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: {
          path: "$categoryInfo",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Extract subcategory name from categoryInfo.subcategories
      {
        $addFields: {
          categoryName: "$categoryInfo.name",
          subcategoryName: {
            $let: {
              vars: {
                matchedSub: {
                  $filter: {
                    input: "$categoryInfo.subcategories",
                    as: "sub",
                    cond: {
                      $eq: ["$$sub._id", "$subCategoryId"],
                    },
                  },
                },
              },
              in: { $arrayElemAt: ["$$matchedSub.name", 0] },
            },
          },
        },
      },

      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          subtitle: { $first: "$subtitle" },
          categoryId: { $first: "$categoryId" },
          subCategoryId: { $first: "$subCategoryId" },
          categoryName: { $first: "$categoryName" },
          subCategoryName: { $first: "$subcategoryName" },
          language: { $first: "$language" },
          level: { $first: "$level" },
          duration: { $first: "$duration" },
          thumbnail: { $first: "$thumbnail" },
          trailer: { $first: "$trailer" },
          description: { $first: "$description" },
          whatYouWillLearn: { $first: "$whatYouWillLearn" },
          welcomeMessage: { $first: "$welcomeMessage" },
          congratulationsMessage: { $first: "$congratulationsMessage" },
          instructorId: { $first: "$instructorId" },
          instructor: { $first: "$instructor" },
          price: { $first: "$price" },
          discountPrice: { $first: "$discountPrice" },
          rating: { $first: "$rating" },
          enrollmentCount: { $first: "$enrollmentCount" },
          isFree: { $first: "$isFree" },
          isPublic: { $first: "$isPublic" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          modules: { $push: "$modules" },
        },
      },
    ]);

    return result.length > 0 ? result[0] : null;
  }

  async toggleCourseStatus(courseId: string): Promise<ICourse | null> {
    const course = await Course.findById(courseId);
    if (!course) return null;
    course.status = !course.status;
    return await course.save();
  }
}