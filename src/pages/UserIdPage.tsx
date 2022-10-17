import { LoadingButton } from "@mui/lab";
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
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/index";
import { getUserById } from "../store/userSlice";
import Task from "../components/Tasks";
import { setThemeMode } from "../themes/themeSettings";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "../components/Loading";

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

  if (load) {
    return <Loading />;
  }

  return (
    <Container sx={{ bgcolor: "var(--colors-bg)", height: "100%" }}>
      {userId.map((user) => {
        return (
          <ListItem key={user.id}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={require("../assets/avatar.png")} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={user.email}
              sx={{ color: "var(--colors-text)" }}
            />
            <Dialog open={isClicked} onClose={handleModalOpen}>
              <DialogContent className="style-for-dialog-content">
                <Typography fontSize={20} fontWeight={800}>
                  Additional information about the user:
                </Typography>
                <Typography
                  fontSize={20}
                >{`Address: ${user.address.city}, ${user.address.suite}, ${user.address.street}`}</Typography>
                <Typography
                  fontSize={20}
                >{`Zip code: ${user.address.zipcode}`}</Typography>
                <Typography
                  fontSize={20}
                >{`Phone number: ${user.phone}`}</Typography>
                <Typography
                  fontSize={20}
                >{`Website: ${user.website}`}</Typography>
                <Typography
                  fontSize={20}
                >{`Company: ${user.company.name}`}</Typography>
                <Box>
                  <DialogActions>
                    <Button onClick={handleModalOpen}>Close</Button>
                  </DialogActions>
                </Box>
              </DialogContent>
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
    </Container>
  );
};

export default User;
