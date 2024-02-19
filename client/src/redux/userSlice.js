import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: 0,
  loading: false,
  error: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = true;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = true;
    },
    subscription: (state, action) => {
      if (state.currentUser.subscriberedUser.includes(action.payload)) {
        state.currentUser.subscriberedUser.splice(
          state.currentUser.subscriberedUser.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscriberedUser.push(action.payload);
      }
    },
  },
});
export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;
export default userSlice.reducer;
