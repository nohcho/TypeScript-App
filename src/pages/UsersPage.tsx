import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
  Grid,
  Box,
  TextField,
  Badge,
} from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/index";
import { getUsers } from "../services/user.services";
import Loader from "../components/Loader";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

function Users() {
  const dispatch = useAppDispatch();

  const { list } = useAppSelector((state) => state.list);
  const load = useAppSelector((state) => state.list.loading);

  const [searchUser, setSearchUser] = useState<string>("");

  const filteredUsers = list.filter((item) => {
    const userName = `${item.name.toLowerCase()}`;
    return userName.includes(searchUser.toLowerCase());
  });

  const getUsersFunction = useCallback(async () => {
    await dispatch(getUsers());
  }, [dispatch]);

  useEffect((): void => {
    getUsersFunction();
  }, [getUsersFunction]);

  if (load) {
    return <Loader />;
  }
  return (
    <Container sx={{ height: "100%", width: 800 }}>
      <Box sx={{ justifyContent: "space-between", display: "flex" }}>
        <TextField
          label="Search field"
          type="search"
          variant="standard"
          placeholder="Search"
          sx={{ width: "50%", m: "auto", mt: 1 }}
          onChange={(event) => setSearchUser(event.target.value)}
        />

        <Badge
          badgeContent={list.length}
          color="primary"
          variant="standard"
          sx={{ mt: 4 }}
        >
          {"Total:"}
          <PeopleAltIcon sx={{ ml: 1 }} color="action" />
        </Badge>
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
                    <Link to={`home/user/${user.id}`} className="text-link">
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
    </Container>
  );
}

export default Users;
