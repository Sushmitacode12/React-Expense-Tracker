import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  isDark: false,
};

const themeSlice = createSlice({
  name: "Theme",
  initialState: initialThemeState,
  reducers: {
    toggle(state) {
      state.isDark = !state.isDark;
    },
  },
});

export default themeSlice.reducer;
export const { toggle } = themeSlice.actions;