import { useState } from "react";
import { User, Moon, Bell, Lock, Trash2 } from "lucide-react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Settings</h2>

      {/* Profile Section */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4 text-indigo-600">
          <User size={20} />
          <h3 className="text-lg font-semibold">Profile Info</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="john@example.com"
            />
          </div>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4 text-indigo-600">
          <Moon size={20} />
          <h3 className="text-lg font-semibold">Preferences</h3>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="rounded"
            />
            Enable Dark Mode
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="rounded"
            />
            Enable Notifications
          </label>
        </div>
      </section>

      {/* Security Section */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4 text-indigo-600">
          <Lock size={20} />
          <h3 className="text-lg font-semibold">Security</h3>
        </div>

        <div className="space-y-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Change Password
          </button>
          <button className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center gap-2">
            <Trash2 size={16} /> Delete Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
