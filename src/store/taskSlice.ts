import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoList } from "../models/index";
import { addTodos, deleteTodos, getTodos, patchTodos } from "../services/task.services";
interface taskList {
  todo: TodoList[];
  loading: boolean;
}

const initialState: taskList = {
  todo: [],
  loading: false,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodos.fulfilled, (state, action: PayloadAction<TodoList>) => {
        state.todo.push(action.payload);
        state.loading = false;
      })
      .addCase(addTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getTodos.fulfilled,
        (state, action: PayloadAction<TodoList[]>) => {
          state.todo = action.payload;
        }
      )
      .addCase(
        deleteTodos.fulfilled,
        (state, action: PayloadAction<Number>) => {
          state.todo = state.todo.filter((elem) => {
            return elem.id !== action.payload;
          });
        }
      )
      .addCase(
        patchTodos.fulfilled,
        (state, action: PayloadAction<TodoList>) => {
          state.todo = state.todo.map((elem) =>
            elem.id === action.payload.id ? action.payload : elem
          );
        }
      );
  },
});

export default todoSlice.reducer;
