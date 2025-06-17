export const getTaskTimeFromStorage = (taskId) => {
  const allTimes = JSON.parse(localStorage.getItem("tasksTime") || "{}");
  return allTimes[taskId] || 0;
};

export const setTaskTimeInStorage = (taskId, totalTime) => {
  const allTimes = JSON.parse(localStorage.getItem("tasksTime") || "{}");
  allTimes[taskId] = totalTime;
  localStorage.setItem("tasksTime", JSON.stringify(allTimes));
};
