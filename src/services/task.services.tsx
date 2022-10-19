import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../helpers";
import { TodoList } from "../models/index";

export const addTodos = createAsyncThunk<
  TodoList,
  { userId: number; id: number; title: string; completed: boolean }
>("todos/addTodos", async ({ userId, id, title, completed }, thunkAPI) => {
  try {
    const res = await request.post("/todos", {
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
    const res = await request.patch("/todos/" + id, {
      title,
    });
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (i: number, thunkAPI) => {
    try {
      await request.delete("/todos/" + i);
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
      const res = await request.get("/todos");
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
