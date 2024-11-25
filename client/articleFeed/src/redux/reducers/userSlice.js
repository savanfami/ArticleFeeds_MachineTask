import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData, Logout, Register,login } from "../action/userAction";

const initialState = {
  loggedIn: false,
  err: null,
  user: null,
  loading: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Register.pending, (state) => {
      state.loggedIn = false;
      state.loading = true;
      state.err = null;
      state.user = null;
    });
    builder.addCase(Register.fulfilled, (state, { payload }) => {
      state.loggedIn = true;
      state.loading = false;
      state.err = null;
      state.user = payload;
    });
    builder.addCase(Register.rejected, (state, { payload }) => {
      state.loggedIn = false;
      state.loading = false;
      state.err = payload;
      state.user = null;
    });
    builder.addCase(Logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Logout.fulfilled, (state) => {
      state.loading = false;
      state.loggedIn = false;
      state.user = null;
      state.err = null;
    });
    builder.addCase(Logout.rejected, (state) => {
      state.loading = false;
      state.err = payload;
    });
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
      state.err = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.loggedIn = true;
      state.user = payload;
      state.err = null;
    });
    builder.addCase(fetchUserData.rejected, (state, { payload }) => {
      state.loading = false;
      state.err = payload;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.err = null;
      state.user = null;
      state.loggedIn = false;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.err = null;
      state.user = payload;
      state.loggedIn = true;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false;
      state.err = payload;
      state.user = null;
      state.loggedIn = false;
    });
  },
});

export const {} = UserSlice.actions;

export default UserSlice.reducer;
