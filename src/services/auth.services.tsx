import { createAsyncThunk } from "@reduxjs/toolkit";
import { MyFormProps } from "models/index";

export const login = createAsyncThunk(
  "auth/login",
  async (params: MyFormProps, thunkAPI) => {
    try {
      const response = params;
      console.log(params);

      return response;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);
