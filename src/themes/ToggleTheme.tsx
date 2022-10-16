import { DarkModeOutlined, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState, useEffect } from "react";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
const ToggleTheme = () => {
  const [theme, setTheme] = useState<string>("Light");

  const toggleTheme = () => setTheme(theme === "Light" ? "Dark" : "Light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Container onClick={toggleTheme} className={"btn"} sx={{ ml: -4 }}>
      <IconButton>
        {theme === "Dark" ? (
          <DarkModeRoundedIcon className="moon" />
        ) : (
          <LightMode className="sun" />
        )}
      </IconButton>

      <Box className={"classMargin"} component="span">
        {theme} Theme
      </Box>
    </Container>
  );
};
export default ToggleTheme;
