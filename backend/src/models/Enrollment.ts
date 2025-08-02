import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IEnrollment extends Document {
    userId: ObjectId | string;
    courseId: ObjectId | string;
    instructorId: ObjectId | string;
    enrolledAt: Date;
    progress: {
      totalLessons:number
      completedLessons: mongoose.Types.ObjectId[] ;
      lastVisited?: mongoose.Types.ObjectId | string
      percentage: number;
      visitedLessons: string[];
    };
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  const EnrollmentSchema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
      instructorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      enrolledAt: { type: Date, default: Date.now },
      progress: {
        totalLessons:{type:Number,required:true },
        completedLessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
        lastVisited: { type: Schema.Types.ObjectId, ref: 'Lesson' },
        percentage: { type: Number, default: 0 },
        visitedLessons: [{ type: String }],
      },
      completed: { type: Boolean, default: false }
    },
    { timestamps: true }
  );
  
  EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true }); 
  
  export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
  