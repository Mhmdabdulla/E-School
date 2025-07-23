import type { CategoryFormValues, CategoryParams } from "../types/category"
import apiClient from "../lib/axios"

export const fetchAllCategories = async ({page, limit, searchQuery, filter}:CategoryParams) => {
    try {
        const res = await apiClient.get("/categories",{
            params:{
                page,
                limit,
                searchQuery,
                filter
            }
        })
        return res
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const fetchListedCategories = async () => {
    try {
        const res = await apiClient.get("/categories/listed")
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createCategory = async (categoryData:CategoryFormValues) => {
    try {
        const res = await apiClient.post("/categories", categoryData)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const editCategory = async (categoryId:string,data:any) => {
    try {
        const res = await apiClient.patch(`/categories/${categoryId}`, data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const toggleCategoryStatus = async (categoryId:string) => {
    try {
        const res = await apiClient.patch(`/categories/${categoryId}/status`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}