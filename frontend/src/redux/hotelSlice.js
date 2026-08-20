import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHotels } from "../services/hotelApi";

export const fetchHotels = createAsyncThunk(
  "hotels/fetchHotels",
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await getHotels(params);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch hotels"
      );
    }
  }
);

const hotelSlice = createSlice({
  name: "hotels",

  initialState: {
    hotels: [],
    pagination: {
      offset: 0,
      limit: 10,
      total: 0,
      count: 0,
    },
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload.hotels;
        state.pagination = action.payload.pagination;
      })

      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default hotelSlice.reducer;