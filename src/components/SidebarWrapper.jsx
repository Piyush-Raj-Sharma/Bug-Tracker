import React from "react";
import Sidebar from "./Sidebar";

const SidebarWrapper = ({ showSidebar, setShowSidebar }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {showSidebar && (
        <>
          <div className="fixed z-50 top-0 left-0 h-full w-64">
            <Sidebar isMobile onClose={() => setShowSidebar(false)} />
          </div>

          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm bg-black/10 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        </>
      )}
    </>
  );
};

export default SidebarWrapper;
