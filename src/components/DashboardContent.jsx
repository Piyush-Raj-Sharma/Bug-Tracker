import React from "react";
import TaskSummaryCards from "./TaskSummaryCards";
import TaskTable from "./TaskTable";

const DashboardContent = () => {
  return (
    <main className="p-4 sm:p-6 space-y-6 overflow-hidden h-full">
      <TaskSummaryCards />

      <section className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex-1 min-h-[72vh]">
        <TaskTable />
      </section>
    </main>
  );
};

export default DashboardContent;
