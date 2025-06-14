

const TaskTable = () => {
  const tasks = [
    {
      id: 1,
      title: "Fix login bug",
      priority: "High",
      status: "In Progress",
      assignee: "John",
      deadline: "2025-06-15",
    },
    {
      id: 2,
      title: "Implement auth",
      priority: "Critical",
      status: "To Do",
      assignee: "Piyush",
      deadline: "2025-06-18",
    },
    {
      id: 3,
      title: "Clean up code",
      priority: "Medium",
      status: "Pending Approval",
      assignee: "Alex",
      deadline: "2025-06-20",
    },
  ];

  const getPriorityStyle = (priority) => {
    const base = "text-xs font-semibold px-2.5 py-0.5 rounded-full";
    switch (priority) {
      case "Low":
        return `${base} bg-green-100 text-green-600`;
      case "Medium":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "High":
        return `${base} bg-orange-100 text-orange-600`;
      case "Critical":
        return `${base} bg-red-100 text-red-600`;
      default:
        return base;
    }
  };

  const getStatusStyle = (status) => {
    const base = "text-sm font-medium";
    switch (status) {
      case "To Do":
        return `${base} text-gray-600`;
      case "In Progress":
        return `${base} text-blue-600`;
      case "Pending Approval":
        return `${base} text-yellow-600`;
      case "Closed":
        return `${base} text-green-600`;
      default:
        return base;
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-indigo-700 mb-4">Task List</h3>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-50 text-indigo-700 text-sm font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Assignee</th>
              <th className="px-4 py-3 text-left">Deadline</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-800">
                  {task.title}
                </td>
                <td className="px-4 py-4">
                  <span className={getPriorityStyle(task.priority)}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={getStatusStyle(task.status)}>
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {task.assignee}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {task.deadline}
                </td>
                <td className="px-4 py-4 flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="md:hidden space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow rounded-xl p-4 space-y-2 text-sm"
          >
            <div className="flex justify-between">
              <h4 className="font-semibold text-gray-800">{task.title}</h4>
              <span className={getPriorityStyle(task.priority)}>
                {task.priority}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status:</span>
              <span className={getStatusStyle(task.status)}>{task.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Assignee:</span>
              <span className="text-gray-800">{task.assignee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Deadline:</span>
              <span className="text-gray-500">{task.deadline}</span>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs">
                Edit
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTable;
