
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movieList: [],
  loading: true,
  error: null,
};

const trendingMovieSlice = createSlice({
  name: 'trendingMovies',
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action) {
      state.movieList = action.payload;
      state.loading = false;
    },
    fetchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = trendingMovieSlice.actions;
export default trendingMovieSlice.reducer;
