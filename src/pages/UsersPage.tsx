import { LoadingButton } from "@mui/lab";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
} from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/index";
import { getUsers } from "../store/userSlice";
import ToggleTheme from "../themes/ToggleTheme";

function Users() {
  const dispatch = useAppDispatch();

  const { list } = useAppSelector((state) => state.list);
  const load = useAppSelector((state) => state.list.loading);

  const styles: any = {
    Paper: {
      padding: 20,
      margin: "auto",
      textAlign: "center",
      width: 700,
      color: "var(--colors-bg)",
    },
  };

  const getUsersFunction = useCallback(async () => {
    await dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    getUsersFunction();
  }, [getUsersFunction]);

  if (load) {
    return <LoadingButton size="large" fullWidth loading></LoadingButton>;
  }
  return (
    <Container sx={{ bgcolor: "var(--colors-bg)", height: "100%" }}>
      <Paper style={styles.Paper}>
        <Container sx={{ bgcolor: "white", width: "70%", margin: "auto" }}>
          <List sx={{ width: "100%", maxWidth: 360 }}>
            {list &&
              list.map((user) => {
                return (
                  <ListItem alignItems="flex-start" key={user.id}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src={require("../assets/avatar.png")}
                      />
                    </ListItemAvatar>
                    <Link to={`/user/${user.id}`}>
                      <ListItemText
                        primary={user.name}
                        secondary={user.email}
                      />
                    </Link>
                  </ListItem>
                );
              })}
          </List>
        </Container>
      </Paper>
    </Container>
  );
}

export default Users;
