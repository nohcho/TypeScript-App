import { Paper } from "@mui/material";
import Form from "./Todo/Form";
import MapTasks from "./Todo/MapTasks";

const Task = () => {
  return (
    <Paper
      sx={{ padding: "20px", margin: "auto", textAlign: "center", width: 900 }}
    >
      <Form />
      <Paper>
        <MapTasks />
      </Paper>
    </Paper>
  );
};

export default Task;
