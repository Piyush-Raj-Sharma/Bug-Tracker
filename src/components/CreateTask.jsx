import { nanoid } from "nanoid";
import React from "react";
import { useForm } from "react-hook-form";

const CreateTask = ({ isOpen, onClose, tasks, setTasks }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

const onSubmit = (data) => {
  data.id = nanoid();
  setTasks([
    ...tasks,
    {
      ...data,
      totalTimeSpent: 0,
      lastSessionDuration: null,
      isSessionActive: false,
      sessionStartTime: null,
    },
  ]);
  reset();
  onClose(); // Close drawer or navigate
};


  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white/80 backdrop-blur-xl shadow-2xl z-50 transition-transform duration-300 ease-in-out border-l border-white/40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto p-6 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">📝 Create Bug</h2>
            <button
              className="text-gray-600 hover:text-red-500 text-2xl font-bold transition"
              onClick={onClose}
            >
              &times;
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex-1">
            {/* Title */}
            <div>
              <label className="text-sm text-gray-600">Title</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter title"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className="w-full mt-1 px-4 py-2 h-28 rounded-lg bg-white/60 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Write a detailed description..."
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>

            {/* Priority */}
            <div>
              <label className="text-sm text-gray-600">Priority</label>
              <select
                {...register("priority", { required: "Priority is required" })}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
              {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="text-sm text-gray-600">Status</label>
              <select
                {...register("status", { required: "Status is required" })}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
              {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
            </div>

            {/* Assignee */}
            <div>
              <label className="text-sm text-gray-600">Assignee</label>
              <input
                type="text"
                {...register("assignee", { required: "Assignee is required" })}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter assignee name"
              />
              {errors.assignee && <p className="text-red-500 text-xs mt-1">{errors.assignee.message}</p>}
            </div>

            {/* Due Date */}
            <div>
              <label className="text-sm text-gray-600">Due Date</label>
              <input
                type="date"
                {...register("deadline", { required: "Due date is required" })}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate.message}</p>}
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
              onSubmit={handleSubmit(onSubmit)}
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTask;
