import { Grid, Paper } from "@mui/material";
import Form from "./Todo/Form";
import MapTasks from "./Todo/MapTasks";
const styles: any = {
  Paper: {
    padding: 20,
    margin: "auto",
    textAlign: "center",
    width: 700,
    color: "var(--colors-bg)",
  },
};
const Task = () => {
  return (
    <Paper style={styles.Paper}>
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
