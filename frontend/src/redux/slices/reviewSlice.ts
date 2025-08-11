import { createSlice, createAsyncThunk,type PayloadAction } from "@reduxjs/toolkit";
import type{ IPopulatedReview } from "../../types/review";
import { fetchCourseReviews } from "../../services/reviewService";

interface ReviewsState {
  reviews: IPopulatedReview[];
  hasMore: boolean;
  filter: string;
  skip: number;
  loadMore: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  hasMore: true,
  filter: "all",
  skip: 0,
  loadMore: false,
  status: "idle",
  error: null,
};

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async ({ courseId, skip, limit, filter }: { courseId: string; skip: number; limit: number; filter: string }) => {
    const data = await fetchCourseReviews(courseId, skip, limit, filter);
    return data;
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<IPopulatedReview>) => {
      state.reviews = [action.payload, ...state.reviews]; 
    },
    editReview: (state, action: PayloadAction<{ id: string; rating: number; comment: string }>) => {
      state.reviews = state.reviews.map((review) =>
        review._id === action.payload.id
          ? { ...review, rating: action.payload.rating, comment: action.payload.comment }
          : review
      );
    },
    deleteReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter((review) => review._id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
      state.skip = 0; 
    },
    setSkip: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
    },
    setLoadMore: (state, action: PayloadAction<boolean>) => {
      state.loadMore = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    clearReview: (state) => {
      state.reviews = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.loadMore) {
          state.reviews = [...state.reviews, ...action.payload.reviews];
          state.loadMore = false;
        } else {
          state.reviews = action.payload.reviews;
        }
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch reviews";
      });
  },
});

export const { addReview, editReview, deleteReview, setFilter, setSkip, setLoadMore, setHasMore, clearReview } = reviewsSlice.actions;

export default reviewsSlice.reducer;