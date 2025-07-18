
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  animeList: [],
  loading: true,
  error: null,
};

const trendingAnimeSlice = createSlice({
  name: 'trendingAnime',
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action) {
      state.animeList = action.payload;
      state.loading = false;
    },
    fetchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = trendingAnimeSlice.actions;
export default trendingAnimeSlice.reducer;
