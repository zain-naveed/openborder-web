import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    access_token:null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
   
    },
    logout: (state,action) => {
      state.user = action.payload || null;
      state.access_token = action.payload || null;
    },
    signup: (state, action) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
    },
  },
});

export const { login, logout, signup } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
