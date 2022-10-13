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
import { deleteTodos, getTodos, patchTodos } from "../../store/taskSlice";
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

  const updateHandler = (i: number, title: string): void => {
    patchTodos({ id: i, title: text });
    setInput(0);
  };

  const handleRemoveTodo = (i: number) => {
    dispatch(deleteTodos(i));
  };

  useEffect(() => {
    getTodosFunction();
  }, [getTodosFunction, dispatch]);
  return (
    <Fragment>
      {findUserTask.map((elem) => {
        return (
          <Grid xs={12} item={true} key={elem.id}>
            <Paper elevation={2}>
              <ListItem
                secondaryAction={
                  <>
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
                  </>
                }
              >
                {input === elem.id ? (
                  <>
                    <Input
                      style={{ width: "90%" }}
                      onChange={inputHandler}
                      value={text}
                    />{" "}
                    <IconButton
                      type="submit"
                      onClick={() => updateHandler(elem.id, elem.title)}
                    >
                      <Save fontSize="small" />
                    </IconButton>{" "}
                  </>
                ) : (
                  <ListItemText primary={elem.title} />
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
