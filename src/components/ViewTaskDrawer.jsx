import React, { useEffect, useState } from "react";
import { formatDuration, intervalToDuration } from "date-fns";
import useTaskManager from "../hooks/useTaskManager";
import {
  getTaskTimeFromStorage,
  setTaskTimeInStorage,
} from "../utils/taskTimeStorage";

const ViewTaskDrawer = ({ isOpen, onClose, task, onEdit }) => {
  const [timers, setTimers] = useState({});
  const userRole = localStorage.getItem("userRole");
  const { updateTask } = useTaskManager();

  const handleApprove = (taskId) => {
    if (task && task.status?.toLowerCase() === "closed") {
      updateTask(taskId, { managerActions: "Approved" });
    }
  };

  const handleReject = (taskId) => {
    if (task && task.status?.toLowerCase() === "closed") {
      updateTask(taskId, { managerActions: "Rejected", status: "Open" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((taskId) => {
          if (updated[taskId].isActive) {
            updated[taskId].liveDuration = Math.floor(
              (Date.now() - updated[taskId].startTime) / 1000
            );
          }
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!task) return;
    const storedTime = getTaskTimeFromStorage(task.id);
    setTimers((prev) => ({
      ...prev,
      [task.id]: prev[task.id] || {
        totalTime: storedTime,
        isActive: false,
        startTime: null,
        lastSession: null,
        liveDuration: 0,
      },
    }));
  }, [task]);

  const toggleSession = () => {
    setTimers((prev) => {
      const taskId = task.id;
      const prevState = prev[taskId] || {
        totalTime: 0,
        isActive: false,
        startTime: null,
        lastSession: null,
        liveDuration: 0,
      };

      if (prevState.isActive) {
        const now = Date.now();
        const sessionDuration = Math.floor((now - prevState.startTime) / 1000);
        const updatedTotal = prevState.totalTime + sessionDuration;
        setTaskTimeInStorage(taskId, updatedTotal);

        return {
          ...prev,
          [taskId]: {
            totalTime: updatedTotal,
            isActive: false,
            startTime: null,
            lastSession: sessionDuration,
            liveDuration: 0,
          },
        };
      } else {
        return {
          ...prev,
          [taskId]: {
            ...prevState,
            isActive: true,
            startTime: Date.now(),
            liveDuration: 0,
          },
        };
      }
    });
  };

  const formatTime = (seconds) => {
    if (!seconds || seconds <= 0) return "0s";
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    return formatDuration(duration, { delimiter: ", " });
  };

  if (!isOpen || !task) return null;
  const taskTimer = timers[task.id] || {};
  const isClosed = task.status?.toLowerCase() === "closed";

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-xl w-full max-w-xl h-[70vh] overflow-hidden flex flex-col transition-all duration-300">
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-indigo-700">Task Details</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold" aria-label="Close details">
                &times;
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto flex-grow text-sm pr-1">
              <div>
                <p className="text-gray-500">Title</p>
                <p className="text-gray-800 font-medium">{task.title}</p>
              </div>
              <div>
                <p className="text-gray-500">Description</p>
                <p className="text-gray-700">{task.description || "No description provided."}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Priority</p>
                  <p className="text-gray-800">{task.priority}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="text-gray-800">{task.status}</p>
                </div>
                <div>
                  <p className="text-gray-500">Assignee</p>
                  <p className="text-gray-800">{task.assignee}</p>
                </div>
                <div>
                  <p className="text-gray-500">Deadline</p>
                  <p className="text-gray-800">{task.deadline}</p>
                </div>
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm space-y-3">
                <h3 className="text-sm font-semibold text-indigo-600 mb-1 flex items-center gap-2">
                  ⏱️ Time Tracking
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-semibold">Total Time Spent</span>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    {formatTime(taskTimer.totalTime)}
                  </span>
                </div>

                {userRole === "manager" && (
                  <div className="text-xs text-gray-400">
                    (This is the time logged by the developer for this task.)
                  </div>
                )}

                {userRole !== "manager" && (
                  <>
                    {taskTimer.isActive && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Live Session</span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                          {formatTime(taskTimer.liveDuration)}
                        </span>
                      </div>
                    )}
                    {!taskTimer.isActive && taskTimer.lastSession !== null && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Last Session</span>
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                          {formatTime(taskTimer.lastSession)}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {userRole === "developer" ? (
              <div className="mt-6 flex justify-between gap-4">
                <button
                  onClick={() => {
                    onClose();
                    onEdit(task);
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={toggleSession}
                  className={`flex-1 py-2 rounded-lg text-white font-semibold transition ${
                    taskTimer.isActive
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {taskTimer.isActive ? "End Session" : "Start Session"}
                </button>
              </div>
            ) : (
              <div className="mt-6 flex justify-between gap-4">
                <button
                  disabled={!isClosed}
                  onClick={() => {
                    onClose();
                    handleApprove(task.id);
                  }}
                  className={`flex-1 py-2 rounded-lg text-white font-semibold transition ${
                    isClosed
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-green-300 cursor-not-allowed"
                  }`}
                >
                  Approve
                </button>
                <button
                  disabled={!isClosed}
                  onClick={() => {
                    onClose();
                    handleReject(task.id);
                  }}
                  className={`flex-1 py-2 rounded-lg text-white font-semibold transition ${
                    isClosed
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-red-300 cursor-not-allowed"
                  }`}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTaskDrawer;
