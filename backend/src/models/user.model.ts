import mongoose, { Document,Schema} from "mongoose";

export interface IUser extends Document {
  _id: string
  name: string;
  email: string;
  password: string;
  phoneNo?:string;
  profileImageUrl?: string;
  googleId?:string
  status:string;
  role: string;
  title?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNo: {type:String},
    profileImageUrl: { type: String },
    googleId:{type:String},
    role: { type: String, enum: ["user", "instructor", "admin"], default: "user" },
    status: {type:String, enum: ["active", "blocked"], default:"active"},
    title: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);