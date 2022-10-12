import { Button, Grid, TextField } from "@mui/material";
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
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={text}
          onChange={inputHandler}
          style={{ width: "92%" }}
          onBlur={onBlurHandler}
          error={isEmpty}
          helperText={isEmpty ? "Enter text" : ""}
        />
        <Button
          style={{ width: "8%" }}
          type="submit"
          variant="contained"
          disabled={!text}
        >
          {load ? (
            <LoadingButton loading style={{ width: "8%" }}>
              
            </LoadingButton>
          ) : (
            "Click"
          )}
        </Button>
      </Grid>
    </form>
  );
};

export default Form;
