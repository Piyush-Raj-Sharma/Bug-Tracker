import React, { useState } from "react";
import SidebarWrapper from "./SidebarWrapper";
import Topbar from "./Topbar";
import DashboardContent from "./DashboardContent";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      <SidebarWrapper showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <div className="flex-1 flex flex-col w-full">
        <Topbar onMenuClick={() => setShowSidebar(true)} />
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
