import { BaseRepository } from "./base.repository";
import { ICategoryRepository } from "../repositories/interfaces/ICategoryRepository";
import { Category, ICategory } from "../models/Category";

export class CategoryRepository extends BaseRepository<ICategory> implements ICategoryRepository{
    constructor() {
        super(Category);
    }
    async toggleCategoryStatus(id: string): Promise<ICategory | null> {
        return Category.findByIdAndUpdate(
            id,
        [
            {
                $set: {
                    status: {
                        $cond: { if: { $eq: ["$status", true] }, then: false, else: true }
                    }
                }
            }
        ],
        { new: true }
        );
    }

    async getAllCategories(filter:any, skip:number, limit:number, sort:any): Promise<ICategory[]> {
        return Category.find(filter).skip(skip).limit(limit).sort(sort).populate("subcategories").exec();
    }

    async getListedCategories():Promise<ICategory[]>{
        return await Category.find({status:true})
    }
}