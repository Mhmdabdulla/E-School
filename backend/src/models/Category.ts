import mongoose, { Document, Schema, Types } from "mongoose";

export interface ISubcategory {
  _id?: Types.ObjectId;
  name: string;
}

export interface ICategory extends Document {
  name: string;
  status: boolean;
  subcategories: ISubcategory[];
  courses: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubcategorySchema = new Schema<ISubcategory>(
  {
    name: { type: String, required: true,unique:true },
  },
  { timestamps: true }
);

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique:true },
    status: { type: Boolean, required: true, default: true },
    subcategories: [SubcategorySchema],
    courses: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", CategorySchema);