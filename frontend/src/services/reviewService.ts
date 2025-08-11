import apiClient from "../lib/axios"
import { AxiosError } from "axios";

export const addReview = async (courseId: string, rating: string, comment: string) => {
  try {
    const res = await apiClient.post("/reviews", { courseId, rating, comment });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Add Review Error:", axiosError);
    type ErrorResponseData = { message?: string };
    const errorData = axiosError.response?.data as ErrorResponseData;
    const errorMessage =
      errorData?.message || "Something went wrong while submitting the review.";
    throw new Error(errorMessage);
  }
};

export const fetchCourseReviews = async (courseId: string, skip:number,limit: number, rating:string ) => {
  try {
    const res = await apiClient.get(`/reviews/${courseId}`,{
      params: {
        skip,
        limit,
        rating
      }
    });
    return res.data;
  } catch (error) {
    console.log("Get Reviews Error:", error);
    throw error;
  }
};

export const updateReview = async (
  reviewId: string,
  rating: string,
  comment: string
) => {
  try {
    const res = await apiClient.patch(`/reviews/${reviewId}`, { rating, comment });
    return res.data;
  } catch (error) {
    console.log("Update Review Error:", error);
    throw error;
  }
};

export const deleteReview = async (reviewId: string) => {
  try {
    const res = await apiClient.delete(`/reviews/${reviewId}`);
    return res.data;
  } catch (error) {
    console.log("Delete Review Error:", error);
    throw error;
  }
};

export const fetchInstructorRating = async() => {
  try {
    const res = await apiClient.get("/reviews/instructor")
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}