import {
  Button,
  Container,
  Grid,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { validation } from "../helpers/validation";

export default function LoginPage() {
  const navigate = useNavigate();
  function handleSubmit(): void {
    navigate("/home");
  }
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: handleSubmit,
    validationSchema: validation,
  });

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Paper
          sx={{
            padding: "20px",
            margin: "auto",
            textAlign: "center",
            width: 700,
          }}
        >
          <Typography variant="h4" sx={{ mb: 4 }} color={"primary"}>
            Sign in
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12}>
              <TextField
                fullWidth
                error={!!formik.touched.email && !!formik.errors.email}
                variant="outlined"
                size="small"
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.email &&
                  formik.errors.email &&
                  formik.errors.email
                }
              />
            </Grid>
            <Grid item lg={12} md={12}>
              <TextField
                fullWidth
                error={!!formik.touched.password && !!formik.errors.password}
                variant="outlined"
                size="small"
                label="Password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.password &&
                  formik.errors.password &&
                  formik.errors.password
                }
              />
            </Grid>
            <Grid
              container
              justifyContent="center"
              alignItems={"center"}
              item
              lg={12}
            >
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </Container>
  );
}
