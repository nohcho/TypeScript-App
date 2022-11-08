import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "../services/auth.services";
import { Auth } from "../models/index";
import { user } from "../constants";

const initialState: Auth = {
  user: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = "";
      localStorage.clear();
      window.location.href = "/signin";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(
        login.fulfilled.toString(),
        (state, action: PayloadAction<string>) => {
          state.isAuthenticated = false;
          localStorage.setItem(user, action.payload);
          window.location.href = "/";
          state.user = action.payload;
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
