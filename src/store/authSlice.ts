import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (params: { email: string; password: string }, thunkAPI) => {
    try {
      const response = params;
      console.log(params);

      return response;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

interface Auth {
  user: string;
  isAuthenticated: boolean;
}

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
          localStorage.setItem("auth.user", action.payload);
          window.location.href = "/";
          state.user = action.payload;
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
