import { Fragment } from "react";
import { Grid, IconButton, ListItem, ListItemText, Paper } from "@mui/material";
import { useCallback, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteTodos, getTodos } from "../../store/taskSlice";

const MapTasks = () => {
  const dispatch = useAppDispatch();
  const { todo } = useAppSelector((state) => state.todo);
  const { userId } = useAppSelector((state) => state.list);

  const getUserId = userId.map((elem) => elem.id);

  const findUserTask = todo
    .filter((elem) => elem.userId.toString() === getUserId.toString())
    .reverse();

  const getTodosFunction = useCallback(async () => {
    await dispatch(getTodos());
  }, [dispatch]);

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
          <Grid xs={12}>
            <Paper elevation={2}>
              <ListItem
                key={elem.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveTodo(elem.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText key={elem.id} primary={elem.title} />
              </ListItem>
            </Paper>
          </Grid>
        );
      })}
    </Fragment>
  );
};

export default MapTasks;
