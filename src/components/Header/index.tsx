import { IconButton, Toolbar, Typography, Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { Fragment, memo } from "react";
import { useAppDispatch, useAppSelector } from "store/store";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { setThemeMode } from "../../store/themeSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../store/authSlice";
import CurrentTime from "./CurrentTime/сurrentTime";

export const Header = memo(() => {
  const dispatch = useAppDispatch();
  const { themeMode } = useAppSelector((state) => state.theme);

  const handleChangeTheme = (): void => {
    const darkOrLight = themeMode === "dark" ? "light" : "dark";
    dispatch(setThemeMode(darkOrLight));
  };

  function handleClickLogout () {
    dispatch(logout());
  }

  return (
        <Fragment>
            <AppBar
                elevation={0}
                position="static"
                sx={{
                  backgroundColor: themeMode === "dark" ? "#1e1e2f" : "#1976d2",
                  color: "#ffffff"
                }}
            >
                <Toolbar sx={{
                  display: "flex", justifyContent: "space-between"
                }}>
                    <Box sx={{
                      display: "flex", alignItems: "center"
                    }}>
                        <IconButton
                            sx={{
                              color: "white"
                            }}
                            disableRipple
                            edge="start"
                            onClick={handleClickLogout}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{
                      display: "flex", alignItems: "center", gap: 1
                    }}>
                        <Typography variant="h6" noWrap>
                            TypeScript App
                        </Typography>
                        <IconButton
                            onClick={handleChangeTheme}
                            color={themeMode === "dark" ? "inherit" : "secondary"}
                        >
                            {themeMode === "dark"
                              ? (
                                <DarkModeIcon />
                                )
                              : (
                                <LightModeIcon fontSize="large" />
                                )}
                        </IconButton>
                    </Box>

                    <Box sx={{
                      minWidth: "140px", textAlign: "right"
                    }}>
                        <CurrentTime />
                    </Box>
                </Toolbar>
            </AppBar>
        </Fragment>
  );
});
