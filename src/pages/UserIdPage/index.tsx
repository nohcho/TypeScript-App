import { Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store";
import { getUserById } from "services/user.services";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { user } from "constants/index";
import { NotFoundPage } from "pages";
import { Loader, ModalOpen, TasksLayout } from "components";

export const UserIdPage = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const { userId } = useAppSelector((state) => state.list);

  const load = useAppSelector((state) => state.list.loading);

  const notFound = useAppSelector((state) => state.list.notFound);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClose = () => {
    setIsClicked(false);
  };

  useEffect((): void => {
    dispatch(getUserById(+id!));
  }, [id, dispatch]);

  if (notFound) {
    return <NotFoundPage />;
  }

  if (load) {
    return <Loader />;
  }

  const isAuthenticated = localStorage.getItem(user);
  if (!isAuthenticated) {
    return <Navigate to={"/signin"} />;
  }
  return (
    <Container sx={{
      height: "100%", width: 900
    }}>
      {userId.map((user) => {
        return (
          <ListItem key={user.id}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={require("assets/avatar.png")} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
            <ModalOpen
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
        <Link to="/" className="text-link">
          <IconButton>
            <ArrowBackIcon color="primary" />
          </IconButton>
        </Link>
      </Box>

      <TasksLayout />
    </Container>
  );
};
