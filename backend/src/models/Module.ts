import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IModule extends Document {
    courseId: mongoose.Schema.Types.ObjectId | string;
    title: string;
    description?: string;
    order: number;
    lessons?: ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

const ModuleSchema = new Schema<IModule>(
    {
      courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
      title: { type: String, required: true },
      description: { type: String },
      order: { type: Number, required: true },
      lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
    },
    { timestamps: true }
  );
  
  export const Module = mongoose.model<IModule>("Module", ModuleSchema);