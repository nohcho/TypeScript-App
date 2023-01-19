import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { useAppSelector } from "store";

interface Props {
  children: React.ReactNode;
}
const MuiThemeProvider: React.FC<Props> = ({ children }) => {
  const { themeMode } = useAppSelector((state) => state.theme);

  const isLight = themeMode === "light";

  const theme = createTheme({
    palette: {
      mode: isLight ? "light" : "dark",
      secondary: {
        main: "#fbcc57",
      },
    },
    typography: {
      fontFamily: "Montserrat",
    },
  });

  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MuiThemeProvider;
