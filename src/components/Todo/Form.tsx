import { Button, Grid, Paper, TextField } from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import { LoadingButton } from "@mui/lab";
import { addTodos } from "../../store/taskSlice";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";

const Form = () => {
  const dispatch = useAppDispatch();

  const { id: userIdFromUrl } = useParams();

  const [text, setText] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const load = useAppSelector((state) => state.todo.loading);
  const { todo } = useAppSelector((state) => state.todo);

  const currentUserId = userIdFromUrl ?? 0;

  const onBlurHandler = () => {
    if (!text) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(
      addTodos({
        userId: +currentUserId,
        id: todo.length + 1,
        title: text,
        completed: false,
      })
    );
    setText("");
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setText(e.target.value);
    setIsEmpty(false);
  };
  return (
    <form onSubmit={submitHandler}>
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid item xs={12}>
          <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
            <TextField
              fullWidth
              value={text}
              onChange={inputHandler}
              style={{ width: "92%" }}
              onBlur={onBlurHandler}
              error={isEmpty}
              helperText={isEmpty ? "Enter text" : ""}
            />
            <Grid xs={2} md={1} item>
              <Button
                style={{ width: "8%" }}
                type="submit"
                variant="contained"
                disabled={!text}
              >
                {load ? (
                  <LoadingButton
                    loading
                    style={{ width: "8%" }}
                  ></LoadingButton>
                ) : (
                  "Click"
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default Form;
