import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersInfo } from "models/index";
import { getUserById, getUsers } from "services/user.services";
export interface usersList {
  list: UsersInfo[];
  userId: UsersInfo[];
  loading: boolean;
  notFound: boolean;
  fakeAuth: boolean;
}

const initialState: usersList = {
  list: [],
  userId: [],
  loading: false,
  notFound: false,
  fakeAuth: false
};

const handleLoadingState = (state: usersList) => {
  state.loading = true;
  state.notFound = false;
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UsersInfo[]>) => {
      state.list = action.payload;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<UsersInfo[]>) => {
          state.notFound = false;
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(getUsers.pending, handleLoadingState)
      .addCase(
        getUserById.fulfilled,
        (state, action: PayloadAction<UsersInfo>) => {
          state.userId = [];
          state.userId.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(getUserById.pending, handleLoadingState)
      .addCase(getUserById.rejected, (state) => {
        state.loading = false;
        state.notFound = true;
      });
  }
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
