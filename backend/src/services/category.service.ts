import { inject, injectable } from "inversify";
import { BaseService } from "./base.service";
import { ICategoryService } from "../services/interfaces/ICategoryService";
import { ICategory } from "../models/Category";
import  TYPES  from "../di/types";
import { CategoryFilter, ICategoryChanges, PaginatedCategories } from "../types/category.types";
import { ICategoryRepository } from "../repositories/interfaces/ICategoryRepository";

@injectable()
export class CategoryService extends BaseService<ICategory> implements ICategoryService {
  constructor(@inject(TYPES.CategoryRepository) private categoryRepository: ICategoryRepository) {
    super(categoryRepository);
  }
  async toggleCategoryStatus(id: string): Promise<ICategory | null> {
    const category = await this.categoryRepository.toggleCategoryStatus(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }
  async getAllCategories({
    page = 1,
    limit = 12,
    search = "",
    filter = "",
  }: CategoryFilter): Promise<PaginatedCategories> {
    const skip = (page - 1) * limit;
    const filterData: any = {};
    if (search) {
      filterData.$or = [
        { name: { $regex: search, $options: "i" } },
        // { description: { $regex: search, $options: 'i' } }
      ];
    }

    switch (filter) {
      case "active":
        filterData.status = true;
        break;
      case "inactive":
        filterData.status = false;
        break;
      default:
        filterData.status = { $exists: true };
        break;
    }
    const sort = { createdAt: -1 };
    console.log(filterData);

    const categories = await this.categoryRepository.getAllCategories(filterData, skip, limit, sort);
    const totalCategories = await this.categoryRepository.countDocuments(filterData);

    return {
      totalCategories,
      totalPages: Math.ceil(totalCategories / limit),
      currentPage: page,
      categories,
    };
  }

  async updateCategory(id: string, data: ICategoryChanges): Promise<ICategory | null> {
    const updatedCategory: Partial<ICategory> = {};

    if (data.name) {
      updatedCategory.name = data.name;
    }

    if (data.status !== undefined) {
      updatedCategory.status = data.status;
    }

    if (data.subcategories) {
      const existingCategory = await this.repository.findById(id);

      if (!existingCategory) {
        return null;
      }

      let subcategories = [...existingCategory.subcategories];

      if (data.subcategories.added) {
        subcategories = [...subcategories, ...data.subcategories.added.map((sub) => ({ name: sub.name }))];
      }

      if (data.subcategories.removed) {
        subcategories = subcategories.filter(
          (sub) => sub._id && !(data.subcategories?.removed ?? []).includes(sub._id.toString())
        );
      }

      if (data.subcategories.modified) {
        subcategories = subcategories.map((sub) => {
          const modifiedSub = data?.subcategories?.modified?.find((modSub) => modSub._id === sub?._id?.toString());
          if (modifiedSub) {
            sub.name = modifiedSub.name;
          }
          return sub;
        });
      }
      updatedCategory.subcategories = subcategories;
    }
    return await this.repository.update(id, updatedCategory);
  }

  async getListedCategories () : Promise<ICategory[] | null>{
    return await this.categoryRepository.getListedCategories()
  }

}