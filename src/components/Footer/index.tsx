import { AppBar, Link, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import TelegramIcon from "@mui/icons-material/Telegram";
import { memo } from "react";

export const Footer = memo(() => {
  return (
    <footer>
      <AppBar elevation={0} position={"static"} sx={{
        mt: 2
      }}>
        <Toolbar sx={{
          display: "flex", justifyContent: "center"
        }}>
          <Container
            maxWidth="lg"
            sx={{
              justifyContent: "center", display: "flex"
            }}
          >
            <Typography color="white" sx={{
              mr: 2
            }}>
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
