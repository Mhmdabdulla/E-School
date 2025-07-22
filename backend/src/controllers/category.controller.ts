
import { ICategoryController } from "./interfaces/ICategoryController";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import  TYPES  from "../di/types";
import { ICategoryService } from "../services/interfaces/ICategoryService";
import { STATUS_CODES } from "../utils/constants";

@injectable()
export class CategoryController implements ICategoryController {
    constructor(@inject(TYPES.CategoryService) private categoryService: ICategoryService) {}
    getAllCategories = async (req:Request, res:Response) => {
            const { page = 1, limit = 12, searchQuery = '', filter = '' } = req.query
            console.log(page, limit, searchQuery, filter)
               const categoriesWithPagination = await this.categoryService.getAllCategories({
                    page: Number(page),
                    limit: Number(limit),
                    search: searchQuery as string || '',
                    filter: filter as string || ''
               })
        res.status(STATUS_CODES.OK).json({message:"Categories fetched successfully", categoriesWithPagination})
   }

   getListedCategories = async (req:Request, res:Response) => {
     const categories = await this.categoryService.getListedCategories()
     res.status(STATUS_CODES.OK).json({message: "categories fetched successfully", categories})
   }

   createCategory = async (req:Request, res:Response) => {
        const { name,status, subcategories } = req.body
        const category = await this.categoryService.create({name,status, subcategories})
        res.status(STATUS_CODES.CREATED).json({message:"Category created successfully", category})
   }

   updateCategory = async (req:Request, res:Response) => {
        const { id } = req.params
        const updatedData = req.body
        const category = await this.categoryService.updateCategory(id, updatedData)
        res.status(STATUS_CODES.OK).json({message:"Category updated successfully", category})
   }

   toggleCategoryStatus = async (req:Request, res:Response) => {
        const { id } = req.params
        const category = await this.categoryService.toggleCategoryStatus(id)
        res.status(STATUS_CODES.OK).json({message:"Category status toggled successfully", category})
   }
}