import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersInfo } from "../models/index";
import { getUserById, getUsers } from "../services/user.services";
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
