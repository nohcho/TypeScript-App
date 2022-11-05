import { IconButton, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { setThemeMode } from "../../store/themeSlice";

const Header = () => {
  const dispatch = useAppDispatch();

  const { themeMode } = useAppSelector((state) => state.theme);

  const handleChangeTheme = (): void => {
    dispatch(setThemeMode(themeMode === "dark" ? "light" : "dark"));
  };
  return (
    <Fragment>
      <AppBar sx={{ alignItems: "center" }} position={'static'}>
        <Toolbar>
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
        </Toolbar>
      </AppBar>
      {/* <Toolbar /> */}
    </Fragment>
  );
};

export default Header;
