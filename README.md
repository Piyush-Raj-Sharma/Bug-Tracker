# 🐞 TrackX - Bug & Task Tracker

A modern bug and task tracking system built with **React**, **Tailwind CSS**, and **Vite**. It supports **Developer** and **Manager** roles with dedicated dashboards, task status workflows, time tracking, and beautiful UI components using Lucide icons and Zustand for state management.

---

## 🚀 How to Run the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bug-tracker.git
cd bug-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production

```bash
npm run build
```

---

## 🔐 Login Credentials

The system uses **hardcoded login credentials** for both user roles.

| Role     | Email                | Password   |
|----------|----------------------|------------|
| Developer | `dev@example.com`   | `dev123`   |
| Manager   | `manager@example.com` | `manager123` |

---

## 🧠 Assumptions

- **No backend**: Authentication and data persistence are handled with `localStorage`.
- **Sessions are per task** and stored locally. Closing the tab or refreshing won't lose time data.
- A logged-in user will stay logged in until they explicitly logout or clear storage.
- Only Managers can approve or reject closed tasks.
- Only Developers can create/edit/start/end session timers.

---

## ✨ Key Features

- 🔐 **Role-Based Authentication** (Developer & Manager)
- ⏱️ **Session Tracking** – Track time spent on each task
- 🧩 **Task Management** – Create, view, edit, and manage bugs/tasks
- 📂 **Slide-In Drawers** – For creating and viewing tasks with modern UI
- 👨‍💼 **Manager Approvals** – Approve or reject closed tasks
- 💅 **Modern UI** – Tailwind CSS, glass effects, responsive layout
- 🔔 **Toast Notifications** – Feedback for task actions and status changes

---

## 📦 Packages Used

### ⚛️ Core Libraries
- **react** – Frontend library
- **react-dom** – DOM rendering
- **vite** – Fast dev server and build tool
- **react-router-dom** – Routing and navigation
- **zustand** – Global state management
- **react-hook-form** – Handling forms and validation

### 🛠️ Utility & Styling
- **tailwindcss** – CSS utility classes
- **lucide-react** – Icon library
- **date-fns** – Date and time formatting utilities
- **nanoid** – Unique ID generation
- **react-toastify** – Toast notifications

### 🧹 Dev Dependencies
- **eslint** – Linting and code quality
- **@vitejs/plugin-react** – Vite plugin for React

---

## 🗂️ Folder Structure

```
src/
│
├── components/             # Reusable components (Drawers, Table, Buttons)
│   ├── CreateTask.jsx
│   ├── ViewTaskDrawer.jsx
│   ├── ManagerActionModal.jsx
│   └── TaskTable.jsx
│
├── hooks/
│   └── useTaskManager.js   # Custom hook for managing task operations
│
│
├── utils/
│   ├── AuthUtils.js        # Login validation
│   ├── SessionUtils.js     # LocalStorage helpers for time tracking
│   └── TableRenderUtils.js # Styling logic for priority/status
│
├── App.jsx                 # Main app router
└── main.jsx                # App entry point
```

---

## 🧪 Example Scenarios

1. **Developer logs in**, creates a task, starts/stops sessions → session time is persisted.
2. **Manager logs in**, views tasks marked as "Closed" → can approve or reject them.

---

## 📝 To-Do / Future Improvements

- ✅ Add persistent backend API (e.g., Firebase, Express)
- ✅ Add user registration and secure authentication
- ✅ Dark Mode support
- ✅ Role management UI
- ✅ Export task reports

---

## 📜 License

This project is for demonstration purpose. Not intended for production use. Feel free to fork and adapt as needed.

---

## 👋 Author

Built with ❤️ by **Piyush Raj**
