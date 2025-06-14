import React from "react";
import TaskSummaryCards from "./TaskSummaryCards";
import TaskTable from "./TaskTable";

const DashboardContent = () => {
  return (
    <main className="p-4 sm:p-6 space-y-6">
      <TaskSummaryCards />

      <section className="bg-white rounded-xl shadow-md p-4 sm:p-6 overflow-x-auto">
        <TaskTable />
      </section>
    </main>
  );
};

export default DashboardContent;
