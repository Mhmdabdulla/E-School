import { createSlice } from "@reduxjs/toolkit";
import { fetchInstructor } from "../thunks/instructorThunk";
import type{ IInstructor } from "../../types/instructor";

interface InstructorState {
  instructor: IInstructor | null;
  status: "idle" | "loading" | "error";
  error: string | null;
}

const initialState: InstructorState = {
  instructor: null,
  status: "idle",
  error: null,
};

const instructorSlice = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    updateInstructor(state, action) {
      state.instructor = action.payload;
    },
    clearInstructor(state) {
      state.instructor = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructor.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchInstructor.fulfilled, (state, action) => {
        state.status = "idle";
        state.instructor = action.payload;
      })
      .addCase(fetchInstructor.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload as string;
      });
  },
});

export const { updateInstructor, clearInstructor } = instructorSlice.actions;
export default instructorSlice.reducer;