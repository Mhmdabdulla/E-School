import apiClient from "../lib/axios";

export const getCartItems = async () => {

    const res = await apiClient.get("/carts");
    return res.data;

};

export const addCourseToCart = async (courseId: string) => {
  try {
    const res = await apiClient.post("/carts/add", { courseId });
    return res.data;
  } catch (error: any) {
    throw error.response;
  }
};

export const removeCourseFromCart = async (courseId: string) => {

    const res = await apiClient.post("/carts/remove", { courseId });
    return res.data;

};