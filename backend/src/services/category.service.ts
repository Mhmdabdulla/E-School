import { inject, injectable } from "inversify";
import { BaseService } from "./base.service";
import { ICategoryService } from "../services/interfaces/ICategoryService";
import { ICategory } from "../models/Category";
import  TYPES  from "../di/types";
import { CategoryFilter, ICategoryChanges} from "../types/category.types";
import { ICategoryRepository } from "../repositories/interfaces/ICategoryRepository";
import { CategoryResponseDTO, PaginatedCategoryResponseDTO } from "../dto/response/category.response.dto";
import { CategoryMapper } from "../mappers/category.mapper";

@injectable()
export class CategoryService extends BaseService<ICategory> implements ICategoryService {
  constructor(@inject(TYPES.CategoryRepository) private categoryRepository: ICategoryRepository) {
    super(categoryRepository);
  }
  async toggleCategoryStatus(id: string): Promise<CategoryResponseDTO | null> {
    const category = await this.categoryRepository.toggleCategoryStatus(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return CategoryMapper.toDTO(category);
  }
  async getAllCategories({
    page = 1,
    limit = 12,
    search = "",
    filter = "",
  }: CategoryFilter): Promise<PaginatedCategoryResponseDTO> {
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


    const categories = await this.categoryRepository.getAllCategories(filterData, skip, limit, sort);
    const totalCategories = await this.categoryRepository.countDocuments(filterData);

    return CategoryMapper.toPaginatedDTO(categories, {
      totalCategories,
      totalPages: Math.ceil(totalCategories / limit),
      currentPage: page
  });

  }

  async updateCategory(id: string, data: ICategoryChanges): Promise<CategoryResponseDTO | null> {
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
    const newUpdatedCategory = await this.repository.update(id, updatedCategory);
    return newUpdatedCategory ? CategoryMapper.toDTO(newUpdatedCategory) : null;

  }

  async getListedCategories () : Promise<CategoryResponseDTO[] | null>{
    const categories = await this.categoryRepository.getListedCategories();

  if (!categories) return null;

  return categories.map((cat) => CategoryMapper.toDTO(cat));
  }

}