import { AppBar, Link, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import TelegramIcon from "@mui/icons-material/Telegram";
import { memo } from "react";
import { useAppSelector } from "store/store";

export const Footer = memo(() => {
  const { themeMode } = useAppSelector((state) => state.theme);

  return (
    <footer>
        <AppBar
            elevation={0}
            position="static" // ⬅️ теперь футер просто в потоке
            sx={{

              width: "100%",
              backgroundColor: themeMode === "dark" ? "#1e1e2f" : "#1976d2"
            }}
        >
            <Toolbar sx={{
              display: "flex", justifyContent: "center"
            }}>
          <Container
            maxWidth="lg"
            sx={{
              justifyContent: "center", display: "flex"
            }}
          >
            <Typography color="white">
              Contact me:
            </Typography>
            <Link href="https://t.me/tasuhanov" color="inherit">
              <TelegramIcon fontSize="medium" />
            </Link>
          </Container>
        </Toolbar>
      </AppBar>
    </footer>
  );
});
