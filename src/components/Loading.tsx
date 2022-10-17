import {
  Box,
  CircularProgress,
} from "@mui/material";
import { Container } from "@mui/system";

function Loading() {
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
        <CircularProgress disableShrink={true} style={{ width: "30%" }} />
      </Box>
    </Container>
  );
}
export default Loading;
