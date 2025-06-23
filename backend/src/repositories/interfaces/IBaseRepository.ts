import { FilterQuery } from "mongoose";

export interface IBaseRepository<T> {
    create(data: Partial<T>): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    findMany(ids: string[]): Promise<T[] | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    findByIdAndUpdate(id: string, data: Partial<T>): Promise<T | null>;
    updateWithOperators(id: string, updateOps: Record<string, any>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    findAll(): Promise<T[] | null>;
    findOne(data: Partial<T>): Promise<T | null>;
    find(filter: FilterQuery<T>):Promise<T[] | null> 
    countDocuments(filter: FilterQuery<T>): Promise<number>;
    findWithPagination(params: {
      filter?: FilterQuery<T>;
      sort?: Record<string, 1 | -1>;
      page?: number;
      limit?: number;
      populate?: string | string[];
    }): Promise<{
      data: T[];
      totalItems: number;
      totalPages: number;
      currentPage: number;
    }>;
    findOneAndUpdate(filter: FilterQuery<T>, data: Partial<T>): Promise<T | null>
    toggleStatus(id: string): Promise<T | null>
    findForAdmin(skip: number, limit: number, filter:FilterQuery<T>): Promise<T[] | null>
  }