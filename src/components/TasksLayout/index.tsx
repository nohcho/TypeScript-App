import { Paper } from "@mui/material";
import Form from "components/Todo/Form";
import ListOfTasks from "components/Todo/ListOfTasks";

const TasksLayout = () => {
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

export default TasksLayout;
