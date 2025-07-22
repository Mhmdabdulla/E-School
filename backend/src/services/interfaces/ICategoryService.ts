import { ICategory } from "../../models/Category";
import { CategoryFilter, ICategoryChanges, PaginatedCategories } from "../../types/category.types";
import { IBaseService } from "./IBaseService";

export interface ICategoryService extends IBaseService<ICategory> {
    toggleCategoryStatus(id: string): Promise<ICategory | null>;
    getAllCategories(filterData:CategoryFilter): Promise<PaginatedCategories>;
    updateCategory(id: string, data: ICategoryChanges): Promise<ICategory | null> 
    getListedCategories () : Promise<ICategory[] | null>
}