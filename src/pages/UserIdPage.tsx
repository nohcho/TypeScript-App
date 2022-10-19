import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Dialog,
  Box,
  DialogContent,
  DialogActions,
  IconButton,
  Backdrop,
  CircularProgress,
  DialogTitle,
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

const User = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const { userId } = useAppSelector((state) => state.list);
  const { themeMode } = useAppSelector((state) => state.theme);
  const load = useAppSelector((state) => state.list.loading);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleModalOpen = (): void => {
    setIsClicked(!isClicked);
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
            <Dialog open={isClicked} onClose={handleModalOpen}>
              <DialogContent sx={{ padding: "10px" }} dividers>
                <DialogTitle fontSize={20} fontWeight={800}>
                  Additional information about the user:
                </DialogTitle>
                <Typography
                  gutterBottom
                  fontSize={20}
                >{`Address: ${user.address.city}, ${user.address.suite}, ${user.address.street}`}</Typography>
                <Typography
                  gutterBottom
                  fontSize={20}
                >{`Zip code: ${user.address.zipcode}`}</Typography>
                <Typography
                  gutterBottom
                  fontSize={20}
                >{`Phone number: ${user.phone}`}</Typography>
                <Typography
                  gutterBottom
                  fontSize={20}
                >{`Website: ${user.website}`}</Typography>
                <Typography
                  gutterBottom
                  fontSize={20}
                >{`Company: ${user.company.name}`}</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalOpen}>Close</Button>
              </DialogActions>
            </Dialog>
          </ListItem>
        );
      })}
      <Button color="primary" onClick={handleModalOpen}>
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
