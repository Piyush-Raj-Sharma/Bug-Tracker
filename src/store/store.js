import { nanoid } from "nanoid";
import { create } from "zustand";

const useTaskTableStore = create((set) => ({
  tasks: [
    {
      id: nanoid(),
      title: "Fix login bug",
      priority: "High",
      status: "In Progress",
      assignee: "John",
      deadline: "2025-06-15",
    },
  ],
  setTasks: (newTask) =>
  set((state) => ({ tasks: [...state.tasks, newTask] })),

}));
export default useTaskTableStore;

