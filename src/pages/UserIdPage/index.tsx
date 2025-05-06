import { Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { memo, useEffect, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/store";
import { getUserById } from "services/user.services";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { user } from "constants/index";
import { NotFoundPage } from "pages";
import { Loader, ModalOpen, TasksLayout } from "components";
import { UsersInfo } from "models";

export const UserIdPage = memo(() => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { userId, loading, notFound } = useAppSelector((state) => state.users);

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleClose = () => setIsClicked(false);

  useEffect(() => {
    dispatch(getUserById(+id!));
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  if (notFound) return <NotFoundPage />;
  if (loading) return <Loader />;

  const isAuthenticated = localStorage.getItem(user);
  if (!isAuthenticated) return <Navigate to="/signin" />;

  return (
      <Box
          sx={{
            minHeight: "calc(100vh - 64px - 64px)",
            paddingTop: "64px",
            paddingBottom: "64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
      >
        <Container sx={{
          width: 900
        }}>
          {userId.map((user: UsersInfo) => (
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
          ))}

          <Button color="primary" onClick={() => setIsClicked(!isClicked)}>
            More info
          </Button>

          <Box mt={2}>
            <Link to="/" className="text-link">
              <IconButton>
                <ArrowBackIcon color="primary" />
              </IconButton>
            </Link>
          </Box>

          <TasksLayout />
        </Container>
      </Box>
  );
});
