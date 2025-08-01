import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchCartItems, addToCart, removeFromCart, moveToWishlist } from "../thunks/cartThunk"; 
import { type CartItem } from "../../types/cart";

interface CartState {
  cartItems: CartItem[];
  status: "idle" | "loading" | "error";
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH CART
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.status = "idle";
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload as string;
      })

      // ADD TO CART
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.cartItems.push(action.payload);
      })

      // REMOVE FROM CART
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const courseIdToRemove = action.meta.arg;
        state.cartItems = state.cartItems.filter(
          (item: CartItem) => item._id !== courseIdToRemove
        );
      })

      //MOVE ITEM TO WISHLIST
      .addCase(moveToWishlist.fulfilled, (state, action) => {
        const courseIdToRemove = action.meta.arg;
        state.cartItems = state.cartItems.filter(
            (item: CartItem) => item._id !== courseIdToRemove
        )
      })
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;