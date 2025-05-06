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
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/store";
import { getUsers } from "services/user.services";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Loader } from "components";
import { UsersInfo } from "@/models";

export const UsersPage = memo(() => {
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
    window.scrollTo(0, 0);
  }, [getUsersFunction]);

  if (loading) {
    return <Loader />;
  }
  return (
      <Container sx={{
        width: 800, minHeight: "100vh", py: 4
      }}>
        <Box sx={{
          justifyContent: "space-between", display: "flex", mb: 4
        }}>
          <TextField
              color="primary"
              label="Search field"
              type="search"
              variant="standard"
              placeholder="Search"
              sx={{
                width: "50%"
              }}
              onChange={(event) => setSearchUser(event.target.value)}
          />

          <Badge
              badgeContent={filteredUsers.length}
              color="primary"
              variant="standard"
              sx={{
                alignSelf: "flex-end"
              }}
          >
            {"Total:"}
            <PeopleAltIcon sx={{
              ml: 1
            }} color="action" />
          </Badge>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
              {filteredUsers.map((user: UsersInfo) => (
                  <Link
                      key={user.id}
                      to={`/user/${user.id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "block"
                      }}
                  >
                      <Paper
                          elevation={2}
                          sx={{
                            p: 2,
                            cursor: "pointer",
                            transition: "0.2s",
                            "&:hover": {
                              boxShadow: 6,
                              transform: "scale(1.01)"
                            }
                          }}
                      >
                          <ListItem alignItems="flex-start">
                              <ListItemAvatar>
                                  <Avatar alt="Remy Sharp" src={require("assets/avatar.png")} />
                              </ListItemAvatar>
                              <ListItemText primary={user.name} secondary={user.email} />
                          </ListItem>
                      </Paper>
                  </Link>
              ))}
          </Box>
      </Container>
  );
});
