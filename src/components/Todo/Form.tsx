import { Grid, Paper, TextField } from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import { addTodos } from "../../services/task.services";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import { LoadingButton } from "@mui/lab";

const Form = () => {
  const dispatch = useAppDispatch();

  const { id: userIdFromUrl } = useParams();

  const [text, setText] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

  const load = useAppSelector((state) => state.todo.loading);

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
    if (0 !== text.trim().length) {
      dispatch(
        addTodos({
          userId: +currentUserId,
          title: text,
          completed: false,
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
              <LoadingButton
                style={{ width: "8%" }}
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
};
export default Form;
