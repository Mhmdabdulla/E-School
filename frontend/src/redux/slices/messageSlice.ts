import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages, sendMessage, updateMessage, deleteMessage } from "../thunks/messageThunk";

export interface Message {
  _id: string;
  chatId:  string;
  senderId: string;
  body?: string;
  readBy: { userId: string; read: boolean }[];
  attachments?: { url: string; mime: string; size: number }[];
  createdAt: Date;
  updatedAt: Date;
}

interface MessageState {
  messages: Message[] ;
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    updateMessageInState(state, action) {
        const updatedMessage = action.payload;
        const index = state.messages.findIndex(msg => msg._id === updatedMessage._id);
        if (index !== -1) {
          state.messages[index] = updatedMessage;
        }
    },
    deleteMessageFromState(state, action) {
        const deletedMessageId = action.payload
        state.messages = state.messages.filter(message => message._id.toString() !== deletedMessageId.toString())
    },
    clearMessage(state) {
      state.messages = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch messages";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        const updatedMessage = action.payload;
        const messageIndex = state.messages.findIndex(
          (message) => message._id === updatedMessage._id
        );
        if (messageIndex !== -1) {
          state.messages[messageIndex] = updatedMessage;
        }
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        const deletedMessageId = action.payload._id
        state.messages = state.messages.filter(
          (message) => message._id !== deletedMessageId
        );
      })
  },
});

export const { addMessage, updateMessageInState, deleteMessageFromState, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;