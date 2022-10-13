import React, { useState, useEffect } from "react";
import { IoMoon, IoMoonOutline } from "react-icons/io5";

const ToggleTheme = () => {
  const [theme, setTheme] = useState<string>("Light");

  const toggleTheme = () => setTheme(theme === "Light" ? "Dark" : "Light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div onClick={toggleTheme}>
      {theme === "Light" ? (
        <IoMoonOutline size="14px" />
      ) : (
        <IoMoon size="14px" />
      )}
      <span style={{ marginLeft: "0.75rem" }}>{theme} Theme</span>
    </div>
  );
};

export default ToggleTheme;
