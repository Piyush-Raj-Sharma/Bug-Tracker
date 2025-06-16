import { Plus } from "lucide-react";

const CreateBugBtn = ({ onClick }) => {
  return (
    <div className="w-full sm:w-auto flex justify-end sm:justify-start">
      <button
        onClick={onClick}
        type="button"
        className="relative group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-200 active:scale-95 font-display font-semibold tracking-wide text-base transition duration-200 w-full sm:w-auto"
      >
        <span className="flex items-center">
          <Plus
            size={20}
            className="transition-transform duration-200 group-hover:rotate-90"
            aria-hidden="true"
          />
        </span>
        <span>Create Bug</span>
      </button>
    </div>
  );
};

export default CreateBugBtn;