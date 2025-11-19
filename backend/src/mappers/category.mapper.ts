import { CategoryResponseDTO } from "../dto/response/category.response.dto";
import { PaginatedCategoryResponseDTO } from "../dto/response/category.response.dto";
import { ICategory } from "../models/Category";

export class CategoryMapper {
  static CategoryMapper(updatedCategory: Partial<ICategory>): ICategory | PromiseLike<ICategory | null> | null {
    throw new Error("Method not implemented.");
  }
  static toDTO(entity: any): CategoryResponseDTO {
    return CategoryResponseDTO.fromEntity(entity);
  }

  static toPaginatedDTO(categories: ICategory[] , pagination: any): PaginatedCategoryResponseDTO {
    return PaginatedCategoryResponseDTO.fromEntities(categories, pagination);
  }
}
