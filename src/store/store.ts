import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import usersReducer, { usersList } from "./userSlice";
import tasksReducer, { taskList } from "./taskSlice";
import themeReducer, { SettingsState } from "./themeSlice";
import loginReducer from "./authSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { Auth } from "models";

export interface StateSchema {
  users: usersList,
  todos: taskList,
  theme: SettingsState,
  login: Auth
}

const rootReducer: ReducersMapObject<StateSchema> = {
  users: usersReducer,
  todos: tasksReducer,
  theme: themeReducer,
  login: loginReducer
};

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
