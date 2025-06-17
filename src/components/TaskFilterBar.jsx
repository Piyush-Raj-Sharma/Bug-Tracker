import React from "react";

const TaskFilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-6">
      {/* Search Input */}
      <div className="relative w-full sm:w-[48%] lg:w-1/4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20"><circle cx="9" cy="9" r="7"/><path d="M16 16l-3-3"/></svg>
        </span>
        <input
          type="text"
          aria-label="Search tasks"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) =>
            onFilterChange({ ...filters, search: e.target.value })
          }
          className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full bg-white hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Priority Filter */}
      <select
        aria-label="Priority filter"
        value={filters.priority}
        onChange={(e) =>
          onFilterChange({ ...filters, priority: e.target.value })
        }
        className="border border-gray-300 px-3 py-2 rounded-lg w-full sm:w-[24%] lg:w-1/5 bg-white shadow-sm hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition text-gray-700"
      >
        <option value="">All Priorities</option>
        <option value="Critical">Critical</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Status Filter */}
      <select
        aria-label="Status filter"
        value={filters.status}
        onChange={(e) =>
          onFilterChange({ ...filters, status: e.target.value })
        }
        className="border border-gray-300 px-3 py-2 rounded-lg w-full sm:w-[24%] lg:w-1/5 bg-white shadow-sm hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition text-gray-700"
      >
        <option value="">All Statuses</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
};

export default TaskFilterBar;