import { Document, FilterQuery } from "mongoose";
import { IBaseRepository } from "../repositories/interfaces/IBaseRepository";
import { IBaseService } from "./interfaces/IBaseService";

export abstract class BaseService<T extends Document> implements IBaseService<T> {
  constructor(protected repository: IBaseRepository<T>) {}

  async create(data: Partial<T>): Promise<T | null> {
    return await this.repository.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return await this.repository.findById(id);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<T | null> {
    return await this.repository.delete(id);
  }

  async findAll(): Promise<T[] | null> {
    return await this.repository.findAll();
  }

  async findOne(data: Partial<T>): Promise<T | null> {
    return await this.repository.findOne(data);
  }

  async toggleStatus(id:string): Promise<T | null>{
    return await this.repository.toggleStatus(id)
  }
  // async findOneAndUpadate(filter: FilterQuery<T>, data: Partial<T>): Promise<T | null>{
  //   return await this.repository.findOneAndUpdate(filter, data)
  // }

  async findWithPagination(options: {
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
  }> {
    return await this.repository.findWithPagination(options);
  }
  

}