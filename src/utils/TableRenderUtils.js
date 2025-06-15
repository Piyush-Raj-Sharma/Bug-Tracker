export const getPriorityStyle = (priority) => {
  const base = "text-xs font-semibold px-2.5 py-0.5 rounded-full";
  switch (priority) {
    case "Low":
      return `${base} bg-green-100 text-green-600`;
    case "Medium":
      return `${base} bg-yellow-100 text-yellow-700`;
    case "High":
      return `${base} bg-orange-100 text-orange-600`;
    case "Critical":
      return `${base} bg-red-100 text-red-600`;
    default:
      return base;
  }
};

export const getStatusStyle = (status) => {
  const base = "text-sm font-medium";
  switch (status) {
    case "Pending Start":
      return `${base} text-gray-600`;
    case "In Progress":
      return `${base} text-blue-600`;
    case "Pending Approval":
      return `${base} text-yellow-600`;
    case "Closed":
      return `${base} text-green-600`;
    default:
      return base;
  }
};
