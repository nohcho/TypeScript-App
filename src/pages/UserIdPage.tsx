import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Dialog,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/index";
import { getUserById } from "../store/userSlice";
import Task from "../components/Tasks";
import ToggleTheme from "../themes/ToggleTheme";

const User = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const { userId } = useAppSelector((state) => state.list);
  const load = useAppSelector((state) => state.list.loading);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleModalOpen = (): void => {
    setIsClicked(!isClicked);
  };

  useEffect((): void => {
    dispatch(getUserById(+id!));
  }, [id, dispatch]);

  if (load) {
    return (
      <LoadingButton fullWidth loading>
        Submit
      </LoadingButton>
    );
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
            <Dialog
              open={isClicked}
              onClose={handleModalOpen}
              children={
                <>
                  {
                    <>
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
                    </>
                  }
                </>
              }
            />
          </ListItem>
        );
      })}
      <Button color="primary" onClick={handleModalOpen}>
        More info
      </Button>

      <ToggleTheme />
      <Task />
    </Container>
  );
};

export default User;
