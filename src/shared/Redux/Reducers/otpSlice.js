import { createSlice } from "@reduxjs/toolkit";

export const otpSlice = createSlice({
  name: "onetimepassword",
  initialState: {
    onetimepassword: null,
  },
  reducers: {
    otp: (state, action) => {
      state.onetimepassword = action.payload;
    },
  },
});

export const { otp } = otpSlice.actions;

export const selectUser = (state) => state.onetimepassword.onetimepassword;

export default otpSlice.reducer;
