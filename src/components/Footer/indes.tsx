import { Box, Link, Typography } from "@mui/material";
import { Container } from "@mui/system";
import TelegramIcon from "@mui/icons-material/Telegram";

const Footer = () => {
  return (
    <footer>
      <Box
        bgcolor="primary.main"
        color="primary"
        sx={{ p: 1.6, mt: 3 }}
        textAlign="center"
      >
        <Container
          maxWidth="lg"
          sx={{ justifyContent: "center", display: "flex" }}
        >
          <Typography color="white" sx={{ mr: 1 }}>
            Contact me:
          </Typography>
          <Link href="https://t.me/tasuhanov" color="inherit">
            <TelegramIcon fontSize="medium" />
          </Link>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
