import React, { useEffect, useState } from "react";

const ViewTaskDrawer = ({ isOpen, onClose, task, onEdit }) => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [lastSessionDuration, setLastSessionDuration] = useState(null);
  const [liveDuration, setLiveDuration] = useState(0);

  useEffect(() => {
    let interval;
    if (isSessionActive) {
      interval = setInterval(() => {
        setLiveDuration(Math.floor((Date.now() - sessionStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, sessionStartTime]);

  useEffect(() => {
    if (!isOpen) {
      setIsSessionActive(false);
      setSessionStartTime(null);
      setLiveDuration(0);
    }
  }, [isOpen]);

  const toggleSession = () => {
    if (isSessionActive) {
      const endTime = Date.now();
      const duration = Math.floor((endTime - sessionStartTime) / 1000);
      setTotalTimeSpent((prev) => prev + duration);
      setLastSessionDuration(duration);
      setIsSessionActive(false);
      setLiveDuration(0);
    } else {
      setSessionStartTime(Date.now());
      setIsSessionActive(true);
      setLastSessionDuration(null);
    }
  };

  const formatSeconds = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (!isOpen || !task) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Centered Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-[70vh] overflow-hidden flex flex-col transition-all duration-300">
          <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-indigo-700">
                Task Details
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 overflow-y-auto flex-grow text-sm pr-1">
              <div>
                <p className="text-gray-500">Title</p>
                <p className="text-gray-800 font-medium">{task.title}</p>
              </div>

              <div>
                <p className="text-gray-500">Description</p>
                <p className="text-gray-700">
                  {task.description ||
                    "Resolve UI glitch on login modal preventing form submission."}
                </p>
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

              {/* Timer Info */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm space-y-3">
                <h3 className="text-sm font-semibold text-indigo-600 mb-1 flex items-center gap-2">
                  ⏱️ Time Tracking
                </h3>

                {/* Total Time Spent */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Time Spent</span>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    {formatSeconds(totalTimeSpent)}
                  </span>
                </div>

                {/* Live Session Timer */}
                {isSessionActive && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Live Session</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                      {formatSeconds(liveDuration)}
                    </span>
                  </div>
                )}

                {/* Last Session Duration */}
                {!isSessionActive && lastSessionDuration !== null && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Last Session</span>
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      {formatSeconds(lastSessionDuration)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
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
                  isSessionActive
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isSessionActive ? "End Session" : "Start Session"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTaskDrawer;
