import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
  Grid,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/index";
import { setThemeMode } from "../store/themeSlice";
import { getUsers } from "../store/userSlice";
import Brightness6Icon from "@mui/icons-material/Brightness6";
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
      {load && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={load}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Container>
  );
}

export default Users;
