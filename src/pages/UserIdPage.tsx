import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/index";
import { getUserById } from "../store/userSlice";
import Task from "../components/Tasks";
import ToggleTheme from "../themes/ToggleTheme";

const User = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const { userId } = useAppSelector((state) => state.list);
  const load = useAppSelector((state) => state.list.loading);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getUserById(id as string));
  }, [id, dispatch]);

  if (load) {
    return (
      <LoadingButton fullWidth loading>
        Submit
      </LoadingButton>
    );
  }


  return (
    <div>
      <Container sx={{ bgcolor: "var(--colors-bg)", height: "100%" }}>
        {userId.map((user) => {
          return (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src={require("../assets/avatar.png")}
                />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={user.email}
                sx={{ color: "var(--colors-text)" }}
              />
            </ListItem>
          );
        })}
        <Button color="primary" onClick={() => setIsClicked(!isClicked)}>
          More info
        </Button>
        <ToggleTheme />
        <Task />
      </Container>
    </div>
  );
};

export default User;
