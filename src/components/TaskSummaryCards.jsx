import React from "react";

const TaskSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <p className="text-sm text-gray-500">Open Bugs</p>
        <h2 className="text-2xl font-bold text-indigo-600">12</h2>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-md">
        <p className="text-sm text-gray-500">Closed Bugs</p>
        <h2 className="text-2xl font-bold text-green-600">28</h2>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-md">
        <p className="text-sm text-gray-500">Pending Approvals</p>
        <h2 className="text-2xl font-bold text-yellow-600">4</h2>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-md">
        <p className="text-sm text-gray-500">Time Spent (hrs)</p>
        <h2 className="text-2xl font-bold text-purple-600">15.5</h2>
      </div>
    </div>
  );
};

export default TaskSummaryCards;
