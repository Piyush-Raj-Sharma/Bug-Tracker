import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path:
        userRole === "manager" ? "/dashboard/manager" : "/dashboard/developer",
    },
    { label: "Bugs", icon: <ListChecks size={20} />, path: "/bugs" },
    { label: "Time Tracker", icon: <Clock size={20} />, path: "/tracker" },
    { label: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
   <aside
  className={`bg-indigo-700 text-white transition-all duration-300 ease-in-out ${
    collapsed ? "w-20" : "w-64"
  } p-4 flex flex-col min-h-screen`}
>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {!collapsed ? (
          <>
            <h1 className="text-2xl font-bold tracking-tight">TrackX</h1>
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

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-600"
                  : "hover:bg-indigo-600 text-white/80 hover:text-white"
              }`
            }
          >
            <span className="min-w-[20px]">{item.icon}</span>
            <span
              className={`ml-3 text-sm whitespace-nowrap transition-all duration-300 ${
                collapsed ? "opacity-0 w-0" : "opacity-100 w-full"
              }`}
            >
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors"
      >
        <LogOut size={20} />
        <span
          className={`ml-3 text-sm font-medium transition-all duration-300 ${
            collapsed ? "opacity-0 w-0" : "opacity-100 w-full"
          }`}
        >
          Logout
        </span>
      </button>
    </aside>
  );
};

export default Sidebar;
