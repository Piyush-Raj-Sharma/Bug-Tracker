import React from "react";

const TaskFilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search anything... "
        value={filters.search}
        onChange={(e) =>
          onFilterChange({ ...filters, search: e.target.value })
        }
        className="border border-gray-300 px-3 py-2 rounded-md w-full sm:w-[48%] lg:w-1/3"
      />

      {/* Priority Filter */}
      <select
        value={filters.priority}
        onChange={(e) =>
          onFilterChange({ ...filters, priority: e.target.value })
        }
        className="border border-gray-300 px-3 py-2 rounded-md w-full sm:w-[24%] lg:w-1/4"
      >
        <option value="">All Priorities</option>
        <option value="Critical">Critical</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={(e) =>
          onFilterChange({ ...filters, status: e.target.value })
        }
        className="border border-gray-300 px-3 py-2 rounded-md w-full sm:w-[24%] lg:w-1/4"
      >
        <option value="">All Statuses</option>
        <option value="Pending Start">Pending Start</option>
        <option value="In Progress">In Progress</option>
        <option value="Pending Approval">Pending Approval</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilterBar;
