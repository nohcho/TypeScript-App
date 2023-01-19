import { IconButton, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { setThemeMode } from "../../store/themeSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../store/authSlice";

export const Header = () => {
  const dispatch = useAppDispatch();

  const { themeMode } = useAppSelector((state) => state.theme);

  const handleChangeTheme = (): void => {
    const darkOrLight = themeMode === "dark" ? "light" : "dark";
    dispatch(setThemeMode(darkOrLight));
  };

  function handleClickLogout() {
    dispatch(logout());
  }

  return (
    <Fragment>
      <AppBar elevation={0} position={"static"}>
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>TypeScript App</Typography>
          {themeMode === "dark" ? (
            <IconButton onClick={handleChangeTheme} size="large">
              <DarkModeIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleChangeTheme} color="secondary">
              <LightModeIcon fontSize="large" />
            </IconButton>
          )}
          <IconButton
            sx={{ position: "absolute", left: 10, color: "white" }}
            disableRipple={true}
            edge="end"
            onClick={handleClickLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <Toolbar /> */}
    </Fragment>
  );
};
