import { Paper } from "@mui/material";
import { Form, ListOfTasks } from "components";

export const TasksLayout = () => {
  return (
    <Paper
      sx={{ padding: "20px", margin: "auto", textAlign: "center", width: 900 }}
    >
      <Form />
      <Paper>
        <ListOfTasks />
      </Paper>
    </Paper>
  );
};
