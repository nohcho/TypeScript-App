import { ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
  Grid,
  Box,
  TextField,
  Badge } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/store";
import { getUsers } from "services/user.services";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Loader } from "components";
import { UsersInfo } from "@/models";

export function UsersPage () {
  const dispatch = useAppDispatch();

  const { list, loading } = useAppSelector((state) => state.users);

  const [searchUser, setSearchUser] = useState<string>("");

  const filteredUsers = useMemo(() => {
    return list.filter((item: UsersInfo) => {
      const userName = `${item.name.toLowerCase()}`;
      return userName.includes(searchUser.toLowerCase());
    });
  }, [list, searchUser]);

  const getUsersFunction = useCallback(async () => {
    await dispatch(getUsers());
  }, [dispatch]);

  useEffect((): void => {
    getUsersFunction();
  }, [getUsersFunction]);

  if (loading) {
    return <Loader />;
  }
  return (
    <Container sx={{
      width: 800, minHeight: "100vh"
    }}>
      <Box sx={{
        justifyContent: "space-between", display: "flex"
      }}>
        <TextField
          color="primary"
          label="Search field"
          type="search"
          variant="standard"
          placeholder="Search"
          sx={{
            width: "50%", m: "auto", mt: 1
          }}
          onChange={(event) => setSearchUser(event.target.value)}
        />

        <Badge
          badgeContent={filteredUsers.length}
          color="primary"
          variant="standard"
          sx={{
            mt: 4
          }}
        >
          {"Total:"}
          <PeopleAltIcon sx={{
            ml: 1
          }} color="action" />
        </Badge>
      </Box>
      {filteredUsers.map((user: UsersInfo) => {
        return (
          <Grid xs={12} key={user.id} item={true}>
            {" "}
            <Paper
              elevation={2}
              sx={{
                padding: "20px", margin: "auto", textAlign: "center"
              }}
            >
              <ListItem alignItems="flex-start" key={user.id}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={require("assets/avatar.png")} />
                </ListItemAvatar>
                <Link to={`/user/${user.id}`} className="text-link">
                  <ListItemText primary={user.name} secondary={user.email} />
                </Link>
              </ListItem>
            </Paper>
          </Grid>
        );
      })}
    </Container>
  );
}
