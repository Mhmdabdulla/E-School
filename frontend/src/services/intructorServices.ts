import apiClient from "../lib/axios";
import { type IInstructor } from "../types/instructor";
import axios, { type AxiosResponse } from "axios";

export const getInstructorDetails = async (userId: string) => {
  try {
    const res: AxiosResponse = await apiClient.get(`/instructors/${userId}/profile`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || error.message || "An unknown error occurred";
    } else {
      throw "An unexpected error occurred";
    }
  }
};

export const fetchInstructorApplications = async () => {
  try {
    const response: AxiosResponse = await apiClient.get(`/instructors/applications`);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const updateInstructorStatus = async (
  instructorId: string,
  status: "approved" | "rejected",
  reason?: string
) => {
  try {
    const response = await apiClient.patch(
      `/instructors/applications/${instructorId}/status`,
      { status, reason },
      { withCredentials: true }
    );
    return response;
  } catch (error: any) {
    console.error("Error updating instructor status:", error);
    return error.response;
  }
};

export const fetchEnrolledInstructors = async (page:number,limit:number,searchQuery:string) => {
  try {
    const res = await apiClient.get("/instructors/enrolled", {
      params:{
        page,
        limit,
        searchQuery
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};


export const updateInstructorProfile = async(instructorId: string, data: Partial<IInstructor>) => {
  try {
    const res = await apiClient.put(`instructors/${instructorId}/profile`, {data})
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const fetchAllInstructors = async(page:number,limit:number,searchQuery:string) => {
  try {
    const res = await apiClient.get("/instructors/", {
      params:{
        page,
        limit,
        searchQuery
      }
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}