import { Box, Button, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

function NotFoundBlock() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {" "}
        <Paper
          elevation={2}
          sx={{
            padding: "20px",
            margin: "auto",
            textAlign: "center",
            width: 700,
          }}
        >
          <Typography sx={{ p: 5 }} variant="h4">
            This page was not found 😞
          </Typography>
          <Link to={"/"} className="text-link">
            <Button variant="outlined" size="small">
              <Link to="/" className="text-link">
                Back home
              </Link>
            </Button>
          </Link>
        </Paper>
      </Box>
    </Container>
  );
}
export default NotFoundBlock;
