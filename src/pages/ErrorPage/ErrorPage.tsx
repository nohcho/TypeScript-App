import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import { Box, Paper, Typography } from "@mui/material";

export const ErrorPage = () => {
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };
  return (
        <Container maxWidth="sm">
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh"
            }}>
                <Paper elevation={2}
                       sx={{
                         padding: "20px",
                         margin: "auto",
                         textAlign: "center",
                         width: 700
                       }}>
                    <Typography sx={{
                      p: 5
                    }} variant="h4">
                        Something went wrong😞
                    </Typography>
                    <Button onClick={reloadPage} variant="contained">
                        Reload the page</Button>
                </Paper>

            </Box>

        </Container>
  );
};
