import { Grid, Paper } from "@mui/material";
import Form from "./Todo/Form";
import MapTasks from "./Todo/MapTasks";

const Task = () => {
  return (
    <Paper className="style-for-paper">
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
