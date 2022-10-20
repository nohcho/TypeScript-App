import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  IconButton,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/index";
import { getUserById } from "../services/user.services";
import Task from "../components/Tasks";
import { setThemeMode } from "../themes/themeSettings";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DialogModal from "../components/ModalOpen";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Loader from "../components/Loader";

const User = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const { userId } = useAppSelector((state) => state.list);
  const { themeMode } = useAppSelector((state) => state.theme);
  const load = useAppSelector((state) => state.list.loading);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClose = (value: string) => {
    setIsClicked(false);
  };

  const handleChangeTheme = (): void => {
    dispatch(setThemeMode(themeMode === "dark" ? "light" : "dark"));
  };

  useEffect((): void => {
    dispatch(getUserById(+id!));
  }, [id, dispatch]);

  if (load) {
    return <Loader />;
  }

  return (
    <Container sx={{ height: "100%", width: 800 }}>
      {userId.map((user) => {
        return (
          <ListItem key={user.id}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={require("../assets/avatar.png")} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
            <DialogModal
              title="Additional information about the user:"
              open={isClicked}
              users={user}
              onClose={handleClose}
            />
          </ListItem>
        );
      })}
      <Button color="primary" onClick={() => setIsClicked(!isClicked)}>
        More info
      </Button>
      {themeMode === "dark" ? (
        <IconButton onClick={handleChangeTheme} size="large">
          <DarkModeIcon />
        </IconButton>
      ) : (
        <IconButton onClick={handleChangeTheme} color="secondary">
          <LightModeIcon fontSize="large" />
        </IconButton>
      )}
      <Box>
        <Link to="/" className="text-link">
          <IconButton>
            <ArrowBackIcon color="primary" />
          </IconButton>
        </Link>
      </Box>

      <Task />
    </Container>
  );
};
export default User;
