import { CategoryResponseDTO, PaginatedCategoryResponseDTO } from "../../dto/response/category.response.dto";
import { ICategory } from "../../models/Category";
import { CategoryFilter, ICategoryChanges,  } from "../../types/category.types";
import { IBaseService } from "./IBaseService";

export interface ICategoryService extends IBaseService<ICategory> {
    toggleCategoryStatus(id: string): Promise<CategoryResponseDTO | null>;
    getAllCategories(filterData:CategoryFilter): Promise<PaginatedCategoryResponseDTO>;
    updateCategory(id: string, data: ICategoryChanges): Promise<CategoryResponseDTO | null> 
    getListedCategories () : Promise<CategoryResponseDTO[] | null>
}