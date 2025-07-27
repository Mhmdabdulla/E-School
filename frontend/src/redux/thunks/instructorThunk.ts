import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInstructorDetails } from "../../services/intructorServices";

export const fetchInstructor = createAsyncThunk(
    'instructor/fetchInstructor',
    async (instructorId: string, {rejectWithValue})=>{
        try {
            const data = await getInstructorDetails(instructorId);
            return data.instructor;
        } catch (error:any) {
             return rejectWithValue(error?.data?.message || "failed to fetch instructor")
        }
    }
)