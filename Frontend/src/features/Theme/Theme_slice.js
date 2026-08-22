import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',

  initialState,

  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('ecotrust-theme', action.payload);
    },

    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('ecotrust-theme', state.theme);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
