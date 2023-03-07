import { Fragment, useState, ChangeEvent, useCallback, useEffect, useMemo } from "react";
import { Box,
  Grid,
  IconButton,
  Input,
  ListItem,
  ListItemText,
  Pagination,
  Paper,
  TextField,
  Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "store";
import { deleteTodos, getTodos, patchTodos } from "services/task.services";
import { Build, Save } from "@mui/icons-material";

export const ListOfTasks = () => {
  const dispatch = useAppDispatch();

  const [input, setInput] = useState<number>();
  const [text, setText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [searchTodo, setSearchTodo] = useState<string>("");

  const { todo } = useAppSelector((state) => state.todo);
  const { userId } = useAppSelector((state) => state.list);

  const getUserId = userId.map((elem) => elem.id);

  const limit = 5;
  const minIndex = (page - 1) * limit;
  const maxIndex = page * limit;

  const findUserTask = todo
    .filter((elem) => elem.userId?.toString() === getUserId.toString())
    .reverse();

  const searchFilteredTodos = useMemo(() => {
    return findUserTask.filter((item) => {
      const userName = `${item.title.toLowerCase()}`;
      return userName.includes(searchTodo.toLowerCase());
    });
  }, [findUserTask, searchTodo]);

  const todoList = useMemo(() => {
    return searchFilteredTodos.filter((item, index) => index >= minIndex && index < maxIndex);
  }, [searchFilteredTodos, minIndex, maxIndex]);

  const isPlural = todoList.length === 1 || todoList.length === 0 ? "" : "s";
  const isPluralTotal =
    findUserTask.length === 1 || findUserTask.length === 0 ? "" : "s";

  const getTodosFunction = useCallback(async () => {
    await dispatch(getTodos());
  }, [dispatch]);

  const handleSearch = (e: string) => {
    setSearchTodo(e);
    setPage(1);
  };

  const showInputHandler = (i: number): void => {
    setInput(i);
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setText(e.target.value);
  };

  const updateHandler = (i: number): void => {
    if (text.trim().length !== 0) {
      dispatch(patchTodos({
        id: i, title: text
      }));
      setInput(0);
      setText("");
    }
    setInput(0);
  };

  const handleRemoveTodo = (i: number): void => {
    dispatch(deleteTodos(i));
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  useEffect((): void => {
    getTodosFunction();
  }, [getTodosFunction, dispatch]);
  return (
    <Fragment>
      <Typography
        variant="h5"
        color="primary"
      >{` ${todoList.length} task${isPlural} of total ${findUserTask.length} task${isPluralTotal}`}</Typography>
      <TextField
        label="Search field"
        color="primary"
        type="search"
        variant="standard"
        placeholder="Search"
        sx={{
          width: "30%", m: "auto", mt: 1
        }}
        onChange={(event) => handleSearch(event.target.value)}
        helperText="Find a task"
      />

      {todoList.map((elem) => {
        return (
          <Grid
            sx={{
              p: 2,
              display: "grid",
              gap: 2
            }}
            xs={12}
            item={true}
            key={elem.id}
          >
            <Paper elevation={2}>
              <ListItem
                secondaryAction={
                  <Fragment>
                    {input !== elem.id
                      ? (
                      <Fragment>
                        <IconButton
                          onClick={() => showInputHandler(elem.id ?? 0)}
                          color="primary"
                        >
                          <Build fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="primary"
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleRemoveTodo(elem.id ?? 0)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Fragment>
                        )
                      : (
                      <>
                        {" "}
                        <IconButton
                          color="primary"
                          type="submit"
                          onClick={() => updateHandler(elem.id ?? 0)}
                        >
                          <Save fontSize="small" />
                        </IconButton>{" "}
                      </>
                        )}
                  </Fragment>
                }
              >
                {input !== elem.id
                  ? (
                  <ListItemText primary={elem.title} />
                    )
                  : (
                  <Input
                    onChange={inputHandler}
                    defaultValue={elem.title}
                    fullWidth
                  />
                    )}
              </ListItem>
            </Paper>
          </Grid>
        );
      })}
      <Box sx={{
        display: "flex", justifyContent: "center", p: 2
      }}>
        <Pagination
          size="small"
          page={page}
          count={Math.ceil(searchFilteredTodos.length / limit)}
          onChange={(e, num: number) => handleChangePage(num)}
          color="primary"
        />
      </Box>
    </Fragment>
  );
};
