import apiClient from "../lib/axios"
import axios from "axios";

export const getAdminDashboard = async () => {
    try {
        const res = await apiClient.get("/admins/dashboard")
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || error.message || "An unknown error occurred";
        } else {
            throw "An unexpected error occurred";
        }
    }
}

  