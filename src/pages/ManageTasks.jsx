import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import tasksData from "../data/tasks.json";

const ManageTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : tasksData;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-auto">
      <div className="p-8 max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">My Tasks</h1>
          <p className="text-slate-600 text-lg">
            View and manage all your scheduled tasks
          </p>
        </div>

        {/* <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full px-6 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>

            <div className="flex gap-2">
              <button className="px-5 py-3 rounded-xl font-semibold bg-lime-400 text-slate-900">
                All
              </button>
              <button className="px-5 py-3 rounded-xl font-semibold bg-slate-100 text-slate-600">
                High
              </button>
              <button className="px-5 py-3 rounded-xl font-semibold bg-slate-100 text-slate-600">
                Medium
              </button>
              <button className="px-5 py-3 rounded-xl font-semibold bg-slate-100 text-slate-600">
                Low
              </button>
            </div>
          </div>
        </div> */}

        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-4">

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-800">
                        {task.title}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold
                          ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : task.priority === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }
                        `}
                      >
                        {task.priority.toUpperCase()}
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-slate-600 mb-3">
                        {task.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <span>
                        {task.time.start} – {task.time.end}
                      </span>

                      <span>
                        {task.repeat.type === "weekly"
                          ? `Weekly (${task.repeat.days.join(", ")})`
                          : "One time"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => deleteTask(task.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-12 text-center mt-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              No tasks yet
            </h3>
            <p className="text-slate-600">
              Create your first task to get started!
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageTasks;
