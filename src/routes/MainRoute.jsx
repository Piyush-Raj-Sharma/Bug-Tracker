import React from "react";
import Dashboard from "../components/Dashboard";
import TaskTable from "../components/TaskTable";
import Settings from "../components/Settings";
import ViewTaskDrawer from "../components/ViewTaskDrawer";
import { Route, Routes } from "react-router-dom";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/task-table" element={<TaskTable />} />
      <Route path="/time-tracker" element={<ViewTaskDrawer />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default MainRoute;              