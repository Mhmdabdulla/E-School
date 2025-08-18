import apiClient from "../lib/axios"

export const fetchChatMessages = async (chatId: string) => {
    try {
        const res = await apiClient.get(`/messages/${chatId}`)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const sendMessageToUser = async(chatId: string, content: FormData ) => {
    content.append("chatId", chatId)
    try {
        const res = await apiClient.post('messages/send', content)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const updateChatMessage = async (messageId: string, body: string) => {
    try {
        const res = await apiClient.patch(`messages/${messageId}`,{body})
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteChatMessage = async (messageId: string) => {
    try {
        const res = await apiClient.delete(`messages/${messageId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}