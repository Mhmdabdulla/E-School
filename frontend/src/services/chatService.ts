import apiClient from "../lib/axios"

export const fetchUserChats = async () => {
    try {
        const res = await apiClient.get("/chats")
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const createChat = async (recieverId: string) => {
    try {
        const res = await apiClient.post("/chats", {recieverId})
        return res.data
    } catch (error) {
        console.log(error)
    }
}