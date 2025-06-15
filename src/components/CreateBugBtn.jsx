import { Plus } from "lucide-react";


const CreateBugBtn = ({ onClick }) => {
  return (
    <div className="w-full sm:w-auto flex justify-end sm:justify-start">
      <button
        onClick={onClick}
        type="button"
        className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-md hover:opacity-90 active:scale-95 transition duration-200 text-sm font-medium w-full sm:w-auto"
      >
        <Plus size={18} />
        <span>Create Bug</span>
      </button>
    </div>
  );
};

export default CreateBugBtn;
