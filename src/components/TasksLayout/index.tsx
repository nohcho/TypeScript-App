import { Paper } from "@mui/material";
import { Form, Tasks } from "components";

export const TasksLayout = () => {
  return (
    <Paper
      sx={{
        padding: "20px", margin: "auto", textAlign: "center", width: 900
      }}
    >
      <Form />
      <Paper>
        <Tasks />
      </Paper>
    </Paper>
  );
};
