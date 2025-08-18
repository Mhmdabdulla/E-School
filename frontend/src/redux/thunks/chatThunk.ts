import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserChats } from "../../services/chatService";

export const fetchChats = createAsyncThunk(
    "chat/fetchChats",
      async (_, { rejectWithValue }) => {
        try {
          const data = await fetchUserChats();
          return data.chats 
        } catch (err: any) {
          return rejectWithValue(err?.data?.message || "Failed to fetch chats");
        }
      }
)