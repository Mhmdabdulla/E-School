import { ICategory } from "../models/Category";

export interface PaginatedCategories {
    totalCategories: number | null;
    totalPages: number | null;
    currentPage: number | null;
    categories: ICategory[] | null;
}

export interface CategoryFilter {
    page: number;
    limit: number;
    search: string;
    filter: string;
}

export interface ISubcategoryChanges {
    added?: { name: string }[];       
    removed?: string[];              
    modified?: { _id: string; name: string }[]; 
  }
  
  export interface ICategoryChanges {
    name?: string;       
    status?: boolean;
    subcategories?: ISubcategoryChanges; 
  }

  