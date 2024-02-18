import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  video: 0,
  loading: false,
  error: true,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = true;
      state.Video = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.Video = null;
      state.loading = false;
      state.error = true;
    },
  },
});
export const { loginStart, loginSuccess, loginFailure, logout } = videoSlice.actions;
export default videoSlice.reducer;
