import { RequestHandler } from "express";

export interface ICategoryController {
    toggleCategoryStatus:RequestHandler;
    getAllCategories:RequestHandler;
    updateCategory:RequestHandler;
    createCategory:RequestHandler;
    getListedCategories:RequestHandler;
}