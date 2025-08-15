import {type Course } from "./course";

export interface Certificate extends Document {
    _id: string;
    userId:  string;
    courseId: string | Course;
    issuedAt: Date;
    certificateUrl: string;
    certificateId: string;
    createdAt: Date;
    updatedAt: Date;
  }