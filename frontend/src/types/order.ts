import type { Course } from "./course";
import type { IUser } from "./user";

export interface IOrder {
    _id:string;
    userId: string | IUser;
    courseIds: Course[];
    totalAmount: number;
    paymentIntentId: string;
    status: 'Paid' | 'Failed';
    createdAt: Date;
    updatedAt: Date;
  }