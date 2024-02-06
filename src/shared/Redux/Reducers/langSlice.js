import { createSlice } from "@reduxjs/toolkit";

export const langSlice = createSlice({
  name: "lang",
  initialState: {
    lang: null,
  },
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { setLang } = langSlice.actions;

// export const selectUser = (state) => state.lang.lang;

export default langSlice.reducer;
