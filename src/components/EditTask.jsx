import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useTaskManager from "../hooks/useTaskManager";
const EditTask = ({ isOpen, onClose, task }) => {
  const { updateTask } = useTaskManager();
  const [currentStatus, setCurrentStatus] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  // Watch live status changes
  const statusWatch = watch("status");
  useEffect(() => {
    if (task) {
      reset(task);
      setCurrentStatus(task.status);
    }
  }, [task, reset]);
  useEffect(() => {
    setCurrentStatus(statusWatch);
  }, [statusWatch]);
  const onSubmit = (data) => {
    updateTask(task.id, data);
    onClose();
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white/80 backdrop-blur-xl shadow-2xl z-50 transition-transform duration-300 ease-in-out border-l border-white/40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">✏️ Edit Bug</h2>
            <button
              className="text-gray-600 hover:text-red-500 text-2xl font-bold"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex-1">
            {/* Title */}
            <div>
              <label className="text-sm text-gray-600">Title</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/60 border border-gray-300"
                placeholder="Enter title"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>
            {/* Description */}
            <div>
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className="w-full mt-1 px-4 py-2 h-28 rounded-lg bg-white/60 border border-gray-300 resize-none"
                placeholder="Write a detailed description..."
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>
            {/* Priority */}
            <div>
              <label className="text-sm text-gray-600">Priority</label>
              <select
                {...register("priority", { required: "Priority is required" })}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/60 border border-gray-300"
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
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/60 border border-gray-300"
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
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/60 border border-gray-300"
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
                className="w-full mt-1 px-4 py-2 rounded-lg bg-white/60 border border-gray-300"
              />
              {errors.deadline && <p className="text-red-500 text-xs mt-1">{errors.deadline.message}</p>}
            </div>
            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg"
              >
                Update Bug
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default EditTask;