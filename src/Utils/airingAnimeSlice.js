// src/Utils/airingAnimeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  animeList: [],
  loading: true,
  error: null,
};

const airingAnimeSlice = createSlice({
  name: 'airingAnime',
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

export const { fetchStart, fetchSuccess, fetchFailure } = airingAnimeSlice.actions;
export default airingAnimeSlice.reducer;
