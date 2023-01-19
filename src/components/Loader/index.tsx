import { Box, CircularProgress } from "@mui/material";
import { Container } from "@mui/system";

export function Loader() {
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
        <CircularProgress />
      </Box>
    </Container>
  );
}
