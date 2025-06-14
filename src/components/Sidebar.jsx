import React, { useState } from "react";
import {
  LayoutDashboard,
  ListChecks,
  Clock,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "Tasks", icon: <ListChecks size={20} /> },
    { label: "Time Tracker", icon: <Clock size={20} /> },
    { label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside
      className={`bg-indigo-700 text-white min-h-screen transition-all duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-64"} p-4 flex flex-col`}
    >
      {/* Toggle */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed ? (
          <>
            <h1 className="text-2xl font-bold transition-opacity duration-300">
              FealtyX
            </h1>
            <button onClick={toggleSidebar}>
              <ChevronLeft size={24} />
            </button>
          </>
        ) : (
          <button onClick={toggleSidebar} className="mx-auto">
            <Menu size={24} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href="#"
            className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <span className="min-w-[20px]">{item.icon}</span>
            <span
              className={`ml-3 text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${
                collapsed ? "opacity-0 w-0" : "opacity-100 w-full"
              }`}
            >
              {item.label}
            </span>
          </a>
        ))}

        {/* Logout (Mobile Only) */}
        <a
          href="#"
          className="md:hidden flex items-center px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition"
        >
          <span className="min-w-[20px] flex justify-center">
            <LogOut size={20} />
          </span>
          <span
            className={`ml-3 text-sm font-medium transition-all duration-300 ${
              collapsed ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Logout
          </span>
        </a>
      </nav>

      {/* Logout (Desktop Only) */}
      <div className="hidden md:block mt-auto">
        <a
          href="#"
          className="flex items-center px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition"
        >
          <span className="min-w-[20px] flex justify-center">
            <LogOut size={20} />
          </span>
          <span
            className={`ml-3 text-sm font-medium transition-all duration-300 ${
              collapsed ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Logout
          </span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
