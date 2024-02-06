import { createSlice } from "@reduxjs/toolkit";

export const scheduleSlice = createSlice({
  name: "scheduling",
  initialState: {
    scheduling: null,
  },
  reducers: {
    consultation: (state, action) => {
      state.scheduling = action.payload;
    },
  },
});

export const { consultation } = scheduleSlice.actions;

export default scheduleSlice.reducer;
