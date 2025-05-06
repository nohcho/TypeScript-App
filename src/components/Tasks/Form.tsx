import { Grid, Paper, TextField } from "@mui/material";
import { useState, ChangeEvent, FormEvent, memo } from "react";
import { addTodos } from "services/task.services";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "store/store";
import { LoadingButton } from "@mui/lab";

export const Form = memo(() => {
  const dispatch = useAppDispatch();

  const { id: userIdFromUrl } = useParams();

  const [text, setText] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

  const load = useAppSelector((state) => state.todos.loading);

  const currentUserId = userIdFromUrl ?? 0;

  const onBlurHandler = (): void => {
    if (!text) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (text.trim().length !== 0) {
      dispatch(
        addTodos({
          userId: +currentUserId,
          title: text,
          completed: false
        })
      );
      setText("");
      setDisabledBtn(false);
    } else {
      setIsEmpty(true);
      setDisabledBtn(true);
      setText("");
    }
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setText(e.target.value);
    setDisabledBtn(false);
    setIsEmpty(false);
  };
  return (
    <form onSubmit={submitHandler}>
      <Paper style={{
        margin: 16, padding: 16
      }}>
        <Grid item >
          <Grid item style={{
            paddingRight: 16
          }}>
            <TextField
              fullWidth
              value={text}
              onChange={inputHandler}
              style={{
                width: "92%"
              }}
              onBlur={onBlurHandler}
              error={isEmpty}
              helperText={isEmpty ? "Enter text" : ""}
            />
            <Grid item>
              <LoadingButton
                style={{
                  width: "8%",
                  marginTop: "8px"
                }}
                type="submit"
                variant="contained"
                disabled={disabledBtn}
                loading={load}
              >
                Click
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
});
