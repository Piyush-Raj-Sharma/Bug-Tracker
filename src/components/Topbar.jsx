import React from "react";
import { Menu } from "lucide-react";

const Topbar = ({ onMenuClick }) => {
  const userRole = localStorage.getItem("userRole");

  return (
    <header className="bg-white shadow-lg border-b-2 border-indigo-100 p-4 flex items-center justify-between sticky top-0 z-30 font-sans">
      {/* Hamburger for Mobile */}
      <button
        className="md:hidden text-indigo-700 hover:bg-indigo-50 rounded-lg p-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-200"
        onClick={onMenuClick}
        aria-label="Open sidebar menu"
      >
        <span className="sr-only">Open sidebar menu</span>
        <Menu
          size={28}
          className="transition-transform group-hover:scale-110"
        />
      </button>
      
      <h1 className="text-2xl sm:text-2xl font-semibold text-black">
        Dashboard
      </h1>

      <div className="hidden sm:flex items-center space-x-3">
        {userRole === "developer" && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold font-sans text-sm shadow-sm">
            <span className="text-md">👩‍💻</span> Hello, Developer
          </span>
        )}
        {userRole === "manager" && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 font-semibold font-sans text-sm shadow-sm">
            <span className="text-md">🧑‍💼</span> Hello, Manager
          </span>
        )}
      </div>
    </header>
  );
};

export default Topbar;
