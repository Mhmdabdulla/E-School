import apiClient from "../lib/axios"

export const createLesson = async(data:any) => {

      return await apiClient.post("/lessons", data, {withCredentials: true})

  }
  
  export const updateLesson = async (lessonId: string, data: any) => {
 
      const res = await apiClient.put(`/lessons/${lessonId}`, data)
      return res.data

  }
  
  export const deleteLesson = async (lessonId: string) => {

      const res = await apiClient.delete(`/lessons/${lessonId}`)
      return res.data

  }