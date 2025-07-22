import { ICategory } from "../../models/Category";
import { IBaseRepository } from "./IBaseRepository";

export interface ICategoryRepository extends IBaseRepository<ICategory> {
    toggleCategoryStatus(id: string): Promise<ICategory | null>;
    getAllCategories(filter:any, skip:number, limit:number, sort:any): Promise<ICategory[]> | null;
    getListedCategories():Promise<ICategory[] | null>
}