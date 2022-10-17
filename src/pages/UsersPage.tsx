import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/index";
import { setThemeMode } from "../store/themeSlice";
import { getUsers } from "../store/userSlice";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import Loading from "../components/Loading";

function Users() {
  const dispatch = useAppDispatch();

  const { list } = useAppSelector((state) => state.list);
  const { themeMode } = useAppSelector((state) => state.theme);
  const load = useAppSelector((state) => state.list.loading);

  const handleChangeTheme = (): void => {
    dispatch(setThemeMode(themeMode === "dark" ? "light" : "dark"));
  };

  const getUsersFunction = useCallback(async () => {
    await dispatch(getUsers());
  }, [dispatch]);

  useEffect((): void => {
    getUsersFunction();
  }, [getUsersFunction]);

  if (load) {
    return <Loading />;
  }
  return (
    <Container sx={{ height: "100%" }}>
      <IconButton onClick={handleChangeTheme}>
        <Brightness6Icon />
      </IconButton>
      {list &&
        list.map((user) => {
          return (
            <Grid xs={12} key={user.id} item={true}>
              {" "}
              <Paper elevation={2} className={"style-for-paper"}>
                <ListItem alignItems="flex-start" key={user.id}>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={require("../assets/avatar.png")}
                    />
                  </ListItemAvatar>
                  <Link to={`/user/${user.id}`} className="text-link">
                    <ListItemText primary={user.name} secondary={user.email} />
                  </Link>
                </ListItem>
              </Paper>
            </Grid>
          );
        })}
    </Container>
  );
}

export default Users;
