import { useState } from "react";
import { getPriorityStyle, getStatusStyle } from "../utils/TableRenderUtils";
import CreateBugBtn from "./CreateBugBtn";
import TaskFilterBar from "./TaskFilterBar";
import { nanoid } from "nanoid";
import CreateTask from "./CreateTask";
import ViewTaskDrawer from "./ViewTaskDrawer";

const TaskTable = () => {
  const [tasks, setTasks] = useState([
    {
      id: nanoid(),
      title: "Fix login bug",
      priority: "High",
      status: "In Progress",
      assignee: "John",
      deadline: "2025-06-15",
    },
    {
      id: nanoid(),
      title: "Implement auth",
      priority: "Critical",
      status: "Pending Start",
      assignee: "Piyush",
      deadline: "2025-06-18",
    },
    {
      id: nanoid(),
      title: "Clean up code",
      priority: "Medium",
      status: "Pending Approval",
      assignee: "Alex",
      deadline: "2025-06-20",
    },
    {
      id: nanoid(),
      title: "Clean ",
      priority: "Critical",
      status: "Pending Approval",
      assignee: "Alex",
      deadline: "2025-06-20",
    },
  ]);

  const [filters, setFilters] = useState({
    search: "",
    priority: "",
    status: "",
  });

  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.assignee.toLowerCase().includes(filters.search.toLowerCase());
    const matchesPriority =
      !filters.priority || task.priority === filters.priority;
    const matchesStatus = !filters.status || task.status === filters.status;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleDelete = (idToDelete) => {
    const updated = tasks.filter((task) => task.id !== idToDelete);
    setTasks(updated);
  };

  const handleView = (task) => {
    setSelectedTask(task);
    setIsViewing(true);
  };

  const handleCloseView = () => {
    setIsViewing(false);
    setSelectedTask(null);
  };

  const handleEdit = (taskToEdit) => {
    setSelectedTask(taskToEdit);
    setIsViewing(false);
    setIsEditing(true);
    setShowDrawer(true);
  };

  const handleSaveTask = (updatedTask) => {
    if (isEditing) {
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasks(updatedTasks);
    } else {
      setTasks([{ ...updatedTask, id: nanoid() }, ...tasks]);
    }

    setShowDrawer(false);
    setSelectedTask(null);
    setIsEditing(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-xl font-bold text-indigo-700">Task List</h3>
        <CreateBugBtn
          onClick={() => {
            setSelectedTask(null);
            setIsEditing(false);
            setShowDrawer(true);
          }}
        />
      </div>

      <TaskFilterBar filters={filters} onFilterChange={setFilters} />

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow mt-4">
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
            {filteredTasks.map((task) => (
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
                  <button
                    onClick={() => handleView(task)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="md:hidden space-y-4 mt-4">
        {filteredTasks.map((task) => (
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
              <span className={getStatusStyle(task.status)}>
                {task.status}
              </span>
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
              <button
                onClick={() => handleView(task)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
              >
                View
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DRAWERS: Create and View */}
      <CreateTask
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
          setIsEditing(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
        defaultValues={selectedTask}
        isEditing={isEditing}
      />
      <ViewTaskDrawer
        task={selectedTask}
        isOpen={isViewing}
        onClose={handleCloseView}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default TaskTable;
