import mongoose, { Document, Schema } from "mongoose";

export interface ILesson extends Document {
    courseId:mongoose.Schema.Types.ObjectId | string;
    moduleId: mongoose.Schema.Types.ObjectId | string;
    title: string;
    description:string;
    contentType: string;
    videoUrl?: string;
    videoPublicId?: string;
    duration:string;
    order: number;
    attachments?: string[]; 
    createdAt?: Date;
    updatedAt?: Date;
}

const LessonSchema = new Schema<ILesson>(
    {
      courseId:{ type: Schema.Types.ObjectId, ref: "Course", required: true },
      moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true },
      title: { type: String, required: true },
      description: {type:String, required:true},
      contentType: { type: String, required: true },
      videoUrl: { type: String },
      videoPublicId: {type: String},
      duration:{type:String},
      order: { type: Number, required: true },
      attachments: [{ type: String }], 
    },
    { timestamps: true }
  );
  
  export const Lesson = mongoose.model<ILesson>("Lesson", LessonSchema);