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
  Box,
  OutlinedInput,
} from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/index";
import { setThemeMode } from "../store/themeSlice";
import { getUsers } from "../services/user.services";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function Users() {
  const dispatch = useAppDispatch();

  const { list } = useAppSelector((state) => state.list);
  const { themeMode } = useAppSelector((state) => state.theme);
  const load = useAppSelector((state) => state.list.loading);

  const [searchUser, setSearchUser] = useState<string>("");

  const filteredUsers = list.filter((item) => {
    const userName = `${item.name.toLowerCase()}`;
    return userName.includes(searchUser.toLowerCase());
  });

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
    <Container sx={{ height: "100%", width: 800 }}>
      <Box sx={{ justifyContent: "space-between", display: "flex" }}>
        {themeMode === "dark" ? (
          <IconButton onClick={handleChangeTheme} size="large">
            <DarkModeIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleChangeTheme} color="secondary">
            <LightModeIcon fontSize="large" />
          </IconButton>
        )}
        <OutlinedInput
          placeholder="Search user here"
          sx={{ width: "50%" }}
          onChange={(event) => setSearchUser(event.target.value)}
        />
      </Box>
      {searchUser
        ? filteredUsers.map((user) => {
            return (
              <Grid xs={12} key={user.id} item={true}>
                {" "}
                <Paper
                  elevation={2}
                  sx={{ padding: "20px", margin: "auto", textAlign: "center" }}
                >
                  <ListItem alignItems="flex-start" key={user.id}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src={require("../assets/avatar.png")}
                      />
                    </ListItemAvatar>
                    <Link to={`/user/${user.id}`} className="text-link">
                      <ListItemText
                        primary={user.name}
                        secondary={user.email}
                      />
                    </Link>
                  </ListItem>
                </Paper>
              </Grid>
            );
          })
        : list.map((user) => {
            return (
              <Grid xs={12} key={user.id} item={true}>
                {" "}
                <Paper
                  elevation={2}
                  sx={{ padding: "20px", margin: "auto", textAlign: "center" }}
                >
                  <ListItem alignItems="flex-start" key={user.id}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src={require("../assets/avatar.png")}
                      />
                    </ListItemAvatar>
                    <Link to={`/user/${user.id}`} className="text-link">
                      <ListItemText
                        primary={user.name}
                        secondary={user.email}
                      />
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
