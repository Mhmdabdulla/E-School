import type{ Course } from "./course";

export interface EnrolledCourse {
    _id:string
    userId: string;
    instructorId?: string;
    courseId: Course | string;
    enrolledAt: Date;
    progress: {
        totalLessons:number
      completedLessons: string[] ;
      lastVisited?: string 
      percentage: number;
    };
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface InstructorStats {
    coursesSold: number;
    studentCount: number;
  }