import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import tasksReducer from "./taskSlice";
import themeReducer from "./themeSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    list: usersReducer,
    todo: tasksReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
