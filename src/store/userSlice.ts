import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersInfo } from "../models/index";
import request from "../helpers";

interface usersList {
  list: UsersInfo[];
  userId: UsersInfo[];
  loading: boolean;
}

const initialState: usersList = {
  list: [],
  userId: [],
  loading: false,
};

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

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UsersInfo[]>) => {
      state.list = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<UsersInfo[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getUserById.fulfilled,
        (state, action: PayloadAction<UsersInfo>) => {
          state.userId = [];
          state.userId.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      });
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
