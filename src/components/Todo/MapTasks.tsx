import { Fragment, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Input,
  ListItem,
  ListItemText,
  Pagination,
  Paper,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteTodos,
  getTodos,
  patchTodos,
} from "../../services/task.services";
import { Build, Save } from "@mui/icons-material";
import { ChangeEvent } from "react";

const MapTasks = () => {
  const dispatch = useAppDispatch();

  const [input, setInput] = useState<number>();
  const [text, setText] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { todo } = useAppSelector((state) => state.todo);
  const { userId } = useAppSelector((state) => state.list);

  const getUserId = userId.map((elem) => elem.id);

  const limit = 5;
  const minIndex = (page - 1) * limit;
  const maxIndex = page * limit;

  const findUserTask = todo
    .filter((elem) => elem.userId?.toString() === getUserId.toString())
    .reverse();

  const todoList = findUserTask.filter(
    (item, index) => index >= minIndex && index < maxIndex
  );

  const getTodosFunction = useCallback(async () => {
    await dispatch(getTodos());
  }, [dispatch]);

  const showInputHandler = (i: number): void => {
    setInput(i);
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setText(e.target.value);
  };

  const updateHandler = (i: number): void => {
    if (0 !== text.trim().length) {
      dispatch(patchTodos({ id: i, title: text }));
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
      <Box>{` Total: ${findUserTask.length}`}</Box>
      {todoList.map((elem) => {
        return (
          <Grid
            sx={{
              p: 2,
              display: "grid",
              gap: 2,
            }}
            xs={12}
            item={true}
            key={elem.id}
          >
            <Paper elevation={2}>
              <ListItem
                secondaryAction={
                  <Fragment>
                    {input !== elem.id ? (
                      <Fragment>
                        <IconButton
                          onClick={() => showInputHandler(elem.id)}
                          color="primary"
                        >
                          <Build fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="primary"
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleRemoveTodo(elem.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Fragment>
                    ) : (
                      <>
                        {" "}
                        <IconButton
                          color="primary"
                          type="submit"
                          onClick={() => updateHandler(elem.id)}
                        >
                          <Save fontSize="small" />
                        </IconButton>{" "}
                      </>
                    )}
                  </Fragment>
                }
              >
                {input !== elem.id ? (
                  <ListItemText primary={elem.title} />
                ) : (
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
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Pagination
          size="small"
          page={page}
          count={Math.ceil(findUserTask.length / limit)}
          onChange={(e, num: number) => handleChangePage(num)}
          color="primary"
        />
      </Box>
    </Fragment>
  );
};

export default MapTasks;
