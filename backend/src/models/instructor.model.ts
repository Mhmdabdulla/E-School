import mongoose, { Document, Schema } from "mongoose";

export interface IInstructor extends Document {
  userId: mongoose.Schema.Types.ObjectId | string;
  courses: mongoose.Schema.Types.ObjectId[];
  idCardImageUrl: string;
  education: {
    highestDegree: string;
    institution: string;
    graduationYear: string;
    fieldOfStudy: string;
  };
  experience: string;
  currentOccupation: string;
  skills: string[];
  preferredSubjects: string[];
  teachingLanguages: string[];
  phoneNumber: string;
  countryCode: string;
  bio: string;
  socialLinks: {
    linkedin: { type: String };
    github: { type: String };
    portfolio: { type: String };
    twitter: {type: String};
    instagram: {type: String};
  };
  adminApproval: {
    status: {
      type: String;
      enum: ["pending", "approved", "rejected"];
      default: "pending";
    };
    reason: { type: String };
  };
  students:number;
  createdAt: Date;
  updatedAt: Date;
}

const InstructorSchema = new Schema<IInstructor>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Course",
      required: false,
    },
    idCardImageUrl: { type: String, required: true },
    education: {
      highestDegree: { type: String, required: true },
      institution: { type: String, required: true },
      graduationYear: { type: String, required: true, match: /^\d{4}$/ },
      fieldOfStudy: { type: String, required: true },
    },
    experience: { type: String, required: true, minlength: 10 },
    currentOccupation: { type: String, required: true, minlength: 2 },
    skills: { type: [String], required: true, min: 1 },
    preferredSubjects: { type: [String], required: true, min: 1 },
    teachingLanguages: { type: [String], required: true, min: 1 },
    phoneNumber: {type: String, required: false},
    countryCode: {type: String, required: false},
    bio: { type: String, required: true, minlength: 50, maxlength: 500 },
    socialLinks: {
      linkedin: { type: String, required: false },
      github: { type: String, required: false },
      portfolio: { type: String, required: false },
      twitter: {type: String, required: false},
      instagram: {type: String, required: false},
    },
    adminApproval: {
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
      reason: { type: String, required: false },
    },
    students: {type: Number, default: 0}
  },
  { timestamps: true }
);

export const Instructor = mongoose.model<IInstructor>("Instructor", InstructorSchema);