import { useEffect } from "react";
import { nanoid } from "nanoid";
import { create } from "zustand";

// Zustand store with localStorage support
const useTaskStore = create((set, get) => ({
  tasks: [],

  // Load from localStorage
  init: () => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          set({ tasks: parsed });
        } else {
          console.warn("Invalid data in localStorage");
        }
      } catch (e) {
        console.error("Failed to parse localStorage data", e);
      }
    }
  },

  // Add a new task
  addTask: (data) => {
    const newTask = {
      id: nanoid(),
      managerActions: null,
      ...data,
      totalTimeSpent: 0,
      lastSessionDuration: null,
      isSessionActive: false,
      sessionStartTime: null,
    };
    const updatedTasks = [...get().tasks, newTask];
    set({ tasks: updatedTasks });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  },

  // Delete a task by ID
  deleteTask: (id) => {
    const updatedTasks = get().tasks.filter((task) => task.id !== id);
    set({ tasks: updatedTasks });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  },

  // ✅ Generic update: update any fields of a task
  updateTask: (id, updates) => {
    const updatedTasks = get().tasks.map((task) =>
      task.id === id ? { ...task, ...updates } : task
    );
    set({ tasks: updatedTasks });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  },
}));

// Custom hook
const useTaskManager = () => {
  const { tasks, addTask, deleteTask, updateTask, init } = useTaskStore();

  useEffect(() => {
    init();
  }, [init]);

  return {
    tasks,
    addTask,
    deleteTask,
    updateTask,
  };
};

export default useTaskManager;
