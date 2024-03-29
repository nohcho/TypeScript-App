import { Box, Button, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { user } from "constants/index";

export function NotFound () {
  const [timeLeft, setTimeLeft] = useState(5);
  const [letter, setLetter] = useState("s");
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const navigate = useNavigate();

  useEffect(() => {
    timer.current = setTimeout(() => {
      if (timeLeft === 2) setLetter("");
      if (timeLeft >= 1) setTimeLeft((t) => t - 1);
    }, 1000);
    if (timeLeft === 0) {
      navigate("/");
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [timeLeft, navigate]);

  const isAuthenticated = localStorage.getItem(user);
  if (!isAuthenticated) {
    return <Navigate to={"/signin"} />;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh"
        }}
      >
        {" "}
        <Paper
          elevation={2}
          sx={{
            padding: "20px",
            margin: "auto",
            textAlign: "center",
            width: 700
          }}
        >
          <Typography sx={{
            p: 5
          }} variant="h4">
            This page was not found 😞
          </Typography>
          <Typography sx={{
            p: 5
          }} fontSize={22}>
            {`You will be redirected to the home page in ${timeLeft} second${letter}`}{" "}
          </Typography>
          <Link to={"/"} className="text-link">
            <Button variant="outlined" size="small">
                Back home
            </Button>
          </Link>
        </Paper>
      </Box>
    </Container>
  );
}
