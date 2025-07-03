import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean
  accessToken: string | null;
  user: any | null;
}

const initialState: AuthState = {
  isAuthenticated:false,
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<{ accessToken: string; user: any }>) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    updateUser: (state, action:PayloadAction<{user:any}>) =>{
      state.user = action.payload.user
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setAuthData, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;