import { useState } from "react";
import { getPriorityStyle, getStatusStyle } from "../utils/TableRenderUtils";
import CreateBugBtn from "./CreateBugBtn";
import TaskFilterBar from "./TaskFilterBar";
import CreateTask from "./CreateTask";
import ViewTaskDrawer from "./ViewTaskDrawer";
import { Eye, Trash2 } from "lucide-react";
import useTaskManager from "../hooks/useTaskManager";
import EditTask from "./EditTask";

const TaskTable = () => {
  const userRole = localStorage.getItem("userRole");
  const { tasks, deleteTask } = useTaskManager();
  const [filters, setFilters] = useState({ search: "", priority: "", status: "" });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);

const filteredTasks = tasks.filter((task) => {
  const title = (task.title || "").toLowerCase();
  const assignee = (task.assignee || "").toLowerCase();
  const deadline = (task.deadline || "").toLowerCase();
  const managerActions = (task.managerActions || "").toLowerCase();
  const search = (filters.search || "").toLowerCase();

  const matchesSearch = title.includes(search) || assignee.includes(search) || deadline.includes(search) || managerActions.includes(search);
  const matchesPriority = !filters.priority || task.priority === filters.priority;
  const matchesStatus = !filters.status || task.status === filters.status;

  return matchesSearch && matchesPriority && matchesStatus;
});


  const handleDelete = (id) => deleteTask(id);
  const handleView = (task) => {
    setSelectedTask(task);
    setIsViewing(true);
  };
  const handleCloseView = () => {
    setIsViewing(false);
    setSelectedTask(null);
  };
  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowEditDrawer(true);
  };

  return (
    <div className="w-full">
      {/* Header & Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-xl font-bold text-indigo-700">Task List</h3>
        {userRole === "developer" && (
          <CreateBugBtn
            onClick={() => {
              setSelectedTask(null);
              setShowDrawer(true);
            }}
          />
        )}
      </div>
      {/* Filters */}
      <TaskFilterBar filters={filters} onFilterChange={setFilters} />
      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow mt-4">
        <div className="overflow-auto max-h-[60vh]">
          <table className="min-w-full table-fixed">
            <thead className="bg-indigo-50 text-indigo-700 text-sm font-semibold sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Priority</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Assignee</th>
                <th className="px-4 py-3 text-left">Deadline</th>
                <th className="px-4 py-3 text-left">Manager Actions</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    <div>No tasks found!</div>
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-800">{task.title}</td>
                    <td className="px-4 py-4">
                      <span className={getPriorityStyle(task.priority)}>{task.priority}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={getStatusStyle(task.status)}>{task.status}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {task.assignee}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{task.deadline}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {task.managerActions || "-"}
                    </td>
                    <td className="px-4 py-4 flex gap-2">
                      <button
                        onClick={() => handleView(task)}
                        className="p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200"
                        title="View Task"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200"
                        title="Delete Task"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-3 mt-4">
        {filteredTasks.length === 0 ? (
          <div className="bg-white text-gray-500 rounded-xl shadow p-6 text-center">
            No tasks found matching the current filters.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white shadow rounded-lg p-3 flex flex-col gap-2 text-sm border border-gray-100"
            >
              <div className="flex items-center justify-between gap-2 min-w-0">
                <h4 className="font-semibold text-gray-800 truncate min-w-0 text-base">
                  {task.title}
                </h4>
                <span
                  className={`${getPriorityStyle(
                    task.priority
                  )} px-2 py-0.5 rounded-full text-xs font-bold shadow-sm capitalize whitespace-nowrap`}
                >
                  {task.priority}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`${getStatusStyle(task.status)} px-2 py-0.5 rounded-full text-xs font-semibold capitalize`}
                >
                  {task.status}
                </span>
              </div>
              <div className="flex items-center justify-between min-w-0">
                <span className="text-gray-600">Assignee:</span>
                <span className="text-gray-800 truncate max-w-[120px]">{task.assignee}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Deadline:</span>
                <span className="text-gray-500">{task.deadline}</span>
              </div>
              {task.managerActions && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Manager Actions:</span>
                  <span className="text-gray-700 capitalize text-xs">
                    {task.managerActions}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => handleView(task)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                  aria-label="View"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs flex items-center gap-1"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* POPUP DRAWERS */}
      <CreateTask
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
          setSelectedTask(null);
        }}
      />
      <ViewTaskDrawer
        task={selectedTask}
        isOpen={isViewing}
        onClose={handleCloseView}
        onEdit={handleEdit}
      />
      <EditTask
        isOpen={showEditDrawer}
        onClose={() => {
          setShowEditDrawer(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskTable;