// src/types/instructor.type.ts

export interface IInstructortype {
  userId: string;
  courses: string[];
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
    linkedin: string;
    github: string;
    portfolio: string;
    twitter: string;
    instagram: string;
  };

  adminApproval: {
    status: "pending" | "approved" | "rejected";
    reason: string;
  };

  students: number;
  createdAt: Date;
  updatedAt: Date;
}
