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
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DialogModal from "../components/ModalOpen";
import Loader from "../components/Loader";
import NotFound from "./NotFoundPage";

const User = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const { userId } = useAppSelector((state) => state.list);

  const load = useAppSelector((state) => state.list.loading);

  const notFound = useAppSelector((state) => state.list.notFound);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClose = (value: string) => {
    setIsClicked(false);
  };

  useEffect((): void => {
    dispatch(getUserById(+id!));
  }, [id, dispatch]);

  if (notFound) {
    return <NotFound />;
  }

  if (load) {
    return <Loader />;
  }
  return (
    <Container sx={{ height: "100%", width: 900 }}>
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

      <Box>
        <Link to="/home" className="text-link">
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
