
import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../helpers";
import { UsersInfo } from "../models/index";

export const getUsers = createAsyncThunk<UsersInfo[]>(
    "users/getUsers",
    async (_, thunkAPI) => {
      try {
        const data = await request.get("/users");
  
        return data.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );
  
  export const getUserById = createAsyncThunk<UsersInfo, Number>(
    "users/getUserById",
    async (id, thunkAPI) => {
      try {
        const data = await request.get("/users/" + id);
  
        return data.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );