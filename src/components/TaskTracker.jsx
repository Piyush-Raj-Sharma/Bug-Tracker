import { useState } from "react";
import TaskTable from "./TaskTable";
import CreateTask from "./CreateTask";
import { Outlet, useLocation } from "react-router-dom";

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const isDrawerOpen = location.pathname === "/dashboard/create-task";

  return (
    <>
      <TaskTable tasks={tasks} setTasks={setTasks} />
      
      {isDrawerOpen && (
        <CreateTask tasks={tasks} setTasks={setTasks} />
      )}
    </>
  );
};

export default TaskTracker;
