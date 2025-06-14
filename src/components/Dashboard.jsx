import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TaskSummaryCards from "./TaskSummaryCards";
import TaskTable from "./TaskTable";
import { Menu } from "lucide-react";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar for Desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar for Mobile */}
      {showSidebar && (
        <>
          <div className="fixed z-50 top-0 left-0 h-full w-64">
            <Sidebar isMobile onClose={() => setShowSidebar(false)} />
          </div>
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm bg-black/10 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Topbar */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden text-indigo-700"
            onClick={() => setShowSidebar(true)}
          >
            <Menu size={28} />
          </button>

          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="text-sm text-gray-600 hidden sm:block">
            Welcome, Developer 👋
          </div>
        </header>

        {/* Content Area */}
        <main className="p-4 sm:p-6 space-y-6">
          {/* Task Summary Cards */}
          <TaskSummaryCards />

          {/* Task List Table */}
          <section className="bg-white rounded-xl shadow-md p-4 sm:p-6 overflow-x-auto">
            <TaskTable />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
