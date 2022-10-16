import { Brightness6 } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState, useEffect } from "react";

const ToggleTheme = () => {
  const [theme, setTheme] = useState<string>("Light");

  const toggleTheme = () => setTheme(theme === "Light" ? "Dark" : "Light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Container onClick={toggleTheme} className={"btn"} sx={{ ml: -4 }}>
      <IconButton>
        {" "}
        <Brightness6 />{" "}
      </IconButton>

      <Box className={"classMargin"} component="span">
        {theme} Theme
      </Box>
    </Container>
  );
};

export default ToggleTheme;
