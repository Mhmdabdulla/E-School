import { createSlice } from "@reduxjs/toolkit";
import {
  deleteNotificationThunk,
  fetchNotificationsThunk,
  markAllNotificationsAsReadThunk,
  markNotificationAsReadThunk,
} from "../thunks/notificationThunk";
import {type Notification } from "../../types/notification";

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload as unknown as typeof state.notifications;
      })
      .addCase(fetchNotificationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notifications";
      })
      .addCase(markAllNotificationsAsReadThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.notifications = state.notifications.map((n) => ({ ...n, isRead: true }));
        }
        // const id = action.payload;
        // const notif = state.notifications.find((n) => n.id === id);
        // if (notif) notif.read = true;
      })
      .addCase(markNotificationAsReadThunk.fulfilled, (state, action) => {
        state.notifications = state.notifications.map((n) =>
          n._id === action.payload._id ? { ...n, isRead: true } : n
        );
      })
      .addCase(deleteNotificationThunk.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter((n) => n._id !== action.payload);
      });
  },
});

export const { addNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;