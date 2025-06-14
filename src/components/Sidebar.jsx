const Sidebar = () => {
  return (
    <aside className="w-64 bg-indigo-700 text-white p-6 hidden md:flex flex-col justify-between min-h-screen">
      {/* Top Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">FealtyX</h2>
        <nav className="space-y-4">
          <a
            href="#"
            className="block px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          >
            Tasks
          </a>
          <a
            href="#"
            className="block px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          >
            Time Tracker
          </a>
          <a
            href="#"
            className="block px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          >
            Settings
          </a>
        </nav>
      </div>

      {/* Logout Button*/}
      <div>
        <a
          href="#"
          className="block px-4 py-2 rounded-lg font-medium text-white hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          Logout
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
