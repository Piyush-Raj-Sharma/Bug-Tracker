import { useEffect } from "react";
import { nanoid } from "nanoid";
import { create } from "zustand";


const useTaskStore = create((set, get) => ({
  tasks: [],


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


  deleteTask: (id) => {
    const updatedTasks = get().tasks.filter((task) => task.id !== id);
    set({ tasks: updatedTasks });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  },

  
  updateTask: (id, updates) => {
    const updatedTasks = get().tasks.map((task) =>
      task.id === id ? { ...task, ...updates } : task
    );
    set({ tasks: updatedTasks });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  },
}));


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
