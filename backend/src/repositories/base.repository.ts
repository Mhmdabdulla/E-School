import { Document, FilterQuery, Model } from "mongoose";
import { IBaseRepository } from "./interfaces/IBaseRepository";


export abstract class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(protected model: Model<T>) {}

  async create(data: Partial<T>): Promise<T | null> {
    const category = await this.model.create(data);
    return category;
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async findMany(ids: string[]): Promise<T[] | null> {
    return await this.model.find({_id: {$in: ids}})
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async findByIdAndUpdate(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, {
      upsert: true,
      new: true,
    });
  }

  async updateWithOperators(id: string, updateOps: Record<string, any>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, updateOps, {
      new: true,
    });
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async findByIdAndDelete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async findAll(): Promise<T[] | null> {
    return await this.model.find();
  }

  async find(filter: FilterQuery<T>): Promise<T[] | null> {
    return await this.model.find(filter);
  }

  async findOne(data: Partial<T>): Promise<T | null> {
    return await this.model.findOne(data as FilterQuery<T>);
  }

  async countDocuments(filter: FilterQuery<T>): Promise<number> {
    return await this.model.countDocuments(filter);
  }

  async findWithPagination({
    filter = {},
    sort = {},
    page = 1,
    limit = 10,
    populate = "",
  }: {
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
    const skip = (page - 1) * limit;

    const query = this.model.find(filter).sort(sort).skip(skip).limit(limit);

    if (populate) {
      if (Array.isArray(populate)) {
        populate.forEach((path) => query.populate(path));
      } else {
        query.populate(populate);
      }
    }

    const [data, totalItems] = await Promise.all([query.exec(), this.model.countDocuments(filter)]);

    return {
      data,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  }

  async findOneAndUpdate(filter: FilterQuery<T>, data: Partial<T>): Promise<T | null> {
    return await this.model.findOneAndUpdate(filter, data, { new: true });
  }

  async toggleStatus(id: string): Promise<T | null> {
    return await this.model.findByIdAndUpdate(
      id,
      [
        {
          $set: {
            status: {
              $cond: { if: { $eq: ["$status", true] }, then: false, else: true },
            },
          },
        },
      ],
      { new: true }
    );
  }

  async findForAdmin(skip: number, limit: number, filter: FilterQuery<T>): Promise<T[] | null> {
      return await this.model.find(filter).skip(skip).limit(limit)
  }
}