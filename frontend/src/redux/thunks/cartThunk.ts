import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCourseToCart, getCartItems, removeCourseFromCart } from "../../services/cartService";
import { addCourseToWishlist } from "../../services/wishlistService";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCartItems();
      return data.cart.courses
    } catch (err: any) {
      return rejectWithValue(err?.data?.message || "Failed to fetch cart items");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const data = await addCourseToCart(courseId);
      return data.cart.courses
    } catch (err: any) {
      return rejectWithValue(err?.data?.message || "Failed to add to cart");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (courseId: string, { rejectWithValue }) => {
    try {
      await removeCourseFromCart(courseId);
      return courseId;
    } catch (err: any) {
      return rejectWithValue(err?.data?.message || "Failed to remove from cart");
    }
  }
);

export const moveToWishlist = createAsyncThunk(
    "cart/moveToWishlist",
    async(courseId:string, {rejectWithValue}) => {
        try {
            await addCourseToWishlist(courseId)
            await removeCourseFromCart(courseId)
            return courseId
        } catch (err: any) {
            return rejectWithValue(err?.data?.message || "Failed to move item to wishlist")
        }
    }
)