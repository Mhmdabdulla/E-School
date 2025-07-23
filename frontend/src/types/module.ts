import type { Lesson } from "./lessons";

export interface Module {
    _id: string;
    courseId: string;
    title: string;
    description?: string;
    order: number;
    lessons?: Lesson[];
    createdAt?: Date;
    updatedAt?: Date;
  }