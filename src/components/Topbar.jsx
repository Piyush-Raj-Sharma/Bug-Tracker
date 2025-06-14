import React from "react";
import { Menu } from "lucide-react";

const Topbar = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      {/* Hamburger Icon for Mobile */}
      <button
        className="md:hidden text-indigo-700 focus:outline-none"
        onClick={onMenuClick}
        aria-label="Open sidebar menu"
      >
        <Menu size={28} />
      </button>

      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>

      <div className="text-sm text-gray-600 hidden sm:block">
        Welcome, Developer 👋
      </div>
    </header>
  );
};

export default Topbar;
