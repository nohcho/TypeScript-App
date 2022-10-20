import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/index";
import { getUserById } from "../services/user.services";
import Task from "../components/Tasks";
import { setThemeMode } from "../themes/themeSettings";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DialogModal from "../components/ModalOpen";

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
      <IconButton onClick={handleChangeTheme}>
        <Brightness6Icon />
      </IconButton>
      <Box>
        <Link to="/" className="text-link">
          <IconButton>
            <ArrowBackIcon color="primary" />
          </IconButton>
        </Link>
      </Box>

      <Task />
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
};
export default User;
