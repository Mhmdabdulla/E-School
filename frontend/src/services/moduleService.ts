import apiClient from "../lib/axios"

export const createModule = async(data:any) => {

      const response = await apiClient.post("/modules", data, {withCredentials:true})
      return response

  }
  
  export const updateModule = async (moduleId:string, data: any) => {

      const res = await apiClient.put(`/modules/${moduleId}`, data)
      return res.data

  }
  
  export const deleteModule = async (moduleId:string) => {

      const res = await apiClient.delete(`/modules/${moduleId}`)
      console.log(res.data)
      return res.data
 
  }