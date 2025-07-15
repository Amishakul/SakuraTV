import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  isLoaded: false,
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      state.list = action.payload;
      state.isLoaded = true;
    },
  },
});

export const { setCharacters } = characterSlice.actions;
export default characterSlice.reducer;
