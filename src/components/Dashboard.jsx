import React from "react";
import Sidebar from "./Sidebar";
import TaskSummaryCards from "./TaskSummaryCards";
import TaskTable from "./TaskTable";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="text-sm text-gray-600">Welcome, Developer 👋</div>
        </header>

        {/* Content Area */}
        <main className="p-6 space-y-6">
  {/* Cards/Stats */}
  <TaskSummaryCards />

  {/* Task List Table */}
  <section className="bg-white rounded-xl shadow-md p-6">
    <TaskTable />
  </section>
</main>
      </div>
    </div>
  );
};

export default Dashboard;
