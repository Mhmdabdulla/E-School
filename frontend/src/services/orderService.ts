import apiClient from "../lib/axios"
import { AxiosError } from "axios"

export const fetchUserOrders = async() => {
    try {
        const res = await apiClient.get("/orders")
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllOrders = async(page:number, limit:number) => {
    try {
        const res = await apiClient.get("/orders/all", {
            params:{
                page,
                limit
            }
        })
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchRecentOrders = async(limit: number) => {
    try {
        const res = await apiClient.get("/orders/recent", {
            params:{
                limit
            }
        })

        return res.data
    } catch (error) {
        const err = error as AxiosError<{ message?: string }>;
        const message = err.response?.data?.message || "Failed to fetch recent orders.";
        throw new Error(message);
    }
}