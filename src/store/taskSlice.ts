import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoList } from "../models/index";
import { tasksPath } from "../constants";
import axios from "axios";

interface taskList {
  todo: TodoList[];
  loading: boolean;
}

const initialState: taskList = {
  todo: [],
  loading: false,
};

export const addTodos = createAsyncThunk<
  TodoList,
  { userId: number; id: number; title: string; completed: boolean }
>("todos/addTodos", async ({ userId, id, title, completed }, thunkAPI) => {
  try {
    const res = await axios.post(tasksPath, {
      userId,
      id,
      title,
      completed,
    });

    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const patchTodos = createAsyncThunk<
  TodoList,
  { id: number; title: string }
>("todos/patchTodos", async ({ id, title }, thunkAPI) => {
  try {
    const res: any = await axios.patch(tasksPath + id, {
      title,
    });
    console.log(res);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (i: number, thunkAPI) => {
    try {
      await axios.delete(tasksPath + i);
      return i;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getTodos = createAsyncThunk<TodoList[]>(
  "todos/getTodos",
  async (_, thunkAPI) => {
    try {
      const res = await axios(tasksPath);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

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
