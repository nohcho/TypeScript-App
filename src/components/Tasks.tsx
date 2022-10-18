import { Grid, Paper } from "@mui/material";
import Form from "./Todo/Form";
import MapTasks from "./Todo/MapTasks";

const Task = () => {
  return (
    <Paper
      sx={{ padding: "20px", margin: "auto", textAlign: "center", width: 900 }}
    >
      <Form />
      <Grid item xs={12}>
        <Paper>
          <MapTasks />
        </Paper>
      </Grid>
    </Paper>
  );
};

export default Task;
