import { Fragment, useState } from "react";
import {
  Grid,
  IconButton,
  Input,
  ListItem,
  ListItemText,
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

  const { todo } = useAppSelector((state) => state.todo);
  const { userId } = useAppSelector((state) => state.list);

  const getUserId = userId.map((elem) => elem.id);

  const findUserTask = todo
    .filter((elem) => elem.userId?.toString() === getUserId.toString())
    .reverse();

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

  useEffect((): void => {
    getTodosFunction();
  }, [getTodosFunction, dispatch]);
  return (
    <Fragment>
      {findUserTask.map((elem) => {
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
                        <IconButton onClick={() => showInputHandler(elem.id)}>
                          <Build fontSize="small" />
                        </IconButton>
                        <IconButton
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
    </Fragment>
  );
};

export default MapTasks;
