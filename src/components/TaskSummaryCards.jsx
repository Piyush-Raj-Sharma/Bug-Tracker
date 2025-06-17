import React from "react";
import useTaskManager from "../hooks/useTaskManager";
import { Bug, CheckCircle2, CircleDot, AlertOctagon } from "lucide-react";

const summaryStyles = [
  {
    color: "indigo",
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    icon: <CircleDot className="w-5 h-5 text-indigo-400" />,
    label: "Open Bugs"
  },
  {
    color: "purple",
    bg: "bg-purple-100",
    text: "text-purple-600",
    icon: <Bug className="w-5 h-5 text-purple-400" />,
    label: "Total Bugs"
  },
  {
    color: "red",
    bg: "bg-red-100",
    text: "text-red-600",
    icon: <AlertOctagon className="w-5 h-5 text-red-400" />,
    label: "Critical Bugs"
  },
  {
    color: "green",
    bg: "bg-green-100",
    text: "text-green-600",
    icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
    label: "Approved"
  }
];

const TaskSummaryCards = () => {
  const { tasks } = useTaskManager();

  const openBugs = tasks.filter(
    (t) => t.status && t.status.toLowerCase() === "open"
  ).length;

  const totalBugs = tasks.length;

  const criticalBugs = tasks.filter(
    (t) => t.priority && t.priority.toLowerCase() === "critical"
  ).length;

  const approvedBugs = tasks.filter(
    (t) => t.managerActions && t.managerActions.toLowerCase() === "approved"
  ).length;


  const counts = [openBugs, totalBugs, criticalBugs, approvedBugs];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {summaryStyles.map((style, i) => (
        <div
          key={style.label}
          className={`flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-3 hover:shadow-lg transition group`}
        >
          <div className={`shrink-0 ${style.bg} rounded-full flex items-center justify-center w-12 h-12`}>
            {style.icon}
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <span className="text-xs uppercase text-gray-500">{style.label}</span>
            <span className={`font-extrabold text-lg sm:text-xl ${style.text} group-hover:underline`}>
              {counts[i]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskSummaryCards;