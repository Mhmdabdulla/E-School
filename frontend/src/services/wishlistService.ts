import apiClient from "../lib/axios";

export const getWishlistItems = async () => {

    const res = await apiClient.get("/wishlists");
    return res.data;

};

export const addCourseToWishlist = async (courseId: string) => {

    const res = await apiClient.post("/wishlists/add", { courseId });
    return res.data;

};

export const removeCourseFromWishlist = async (courseId: string) => {

    const res = await apiClient.post("/wishlists/remove", { courseId });
    return res.data;

};