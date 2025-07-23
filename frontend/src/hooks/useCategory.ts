import { fetchAllCategories } from "../services/categoryService";
import type { Category } from "../types/category";
import { useEffect, useState } from "react";

export const useCategory = () => {
    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState<Category[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [filter, setFilter] = useState<string | null>("")

    const categoriesPerPage = 10
   
    const fetchCategories = async (page: number, limit: number, search: string, filter: string) => {
        try {
            setLoading(true)
            const response = await fetchAllCategories({
            page,
            limit,
            searchQuery: search,
            filter,
            })
            console.log(response.data.categoriesWithPagination.categories)
            setCategories(response.data.categoriesWithPagination.categories)
            setTotalPages(response.data.categoriesWithPagination.totalPages) 
        } catch (error) {
            console.error("Error fetching categories:", error)
        } finally {
            setLoading(false)
            console.log(categories)
        }
    }
    
    useEffect(() => {
      const getCategories = async () => {
        try {
            await fetchCategories(currentPage, categoriesPerPage, searchQuery, filter as string)
        } catch (error) {
            console.error("Error fetching categories:", error)
        }finally{
            setLoading(false)
        }
      }
      getCategories()
    },[ currentPage, searchQuery, filter,totalPages, currentPage ])

    const refetch = () => {
        fetchCategories(currentPage, categoriesPerPage, searchQuery, filter as string);
      };

    return {
        categories,
        setCategories,
        loading,
        totalPages,
        currentPage,
        setCurrentPage,
        searchQuery,
        setSearchQuery,
        filter,
        setFilter,
        refetch
    }
}