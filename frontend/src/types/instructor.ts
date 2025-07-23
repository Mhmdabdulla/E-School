import type { IUser } from "./user";

export interface IInstructor {
  _id: string;
  userId: string | IUser;
  courses?:string;
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
  bio: string;
  phoneNumber: string;
  countryCode: string;
  socialLinks?: {
    instagram?: { type: string };
    twitter?: { type: string };
    linkedin?: { type: string };
    github?: { type: string };
    portfolio?: { type: string };
  };
  adminApproval: {
    status: {
      type: string;
      enum: ["pending", "approved", "rejected"];
      default: "pending";
    };
    reason: { type: string };
  };
  rating?:string;
  students?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InstructorBasicDetails {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNo?: string;
  profileImageUrl?: string;
  googleId?: string;
  status: string;
  role: string;
  title?: string;
  totalStudents: number;
  createdAt: Date;
  updatedAt: Date;
}