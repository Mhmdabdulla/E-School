export interface Lesson {
  _id: string;
  moduleId: string;
  courseId: string;
  title: string;
  contentType: string;
  // videoUrl?: string;
  videoPublicId?: string
  duration: string;
  description: string;
  order: number;
  attachments?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}