import { useState, useEffect } from "react";
import tasksData from "../data/tasks.json";


const ManageTasks = () => {
  // const [tasks, setTasks] = useState(tasksData);

  const today = new Date().toISOString().slice(0, 10);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : tasksData;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  const [formState, setFormState] = useState({
    title: "",
    description: "",
    priority: "medium",
    time: {
      start: "",
      end: "",
    },
    repeat: {
      type: "once",
      days: [],
    },
  });

  const days = [
    { key: "mon", label: "M" },
    { key: "tue", label: "T" },
    { key: "wed", label: "W" },
    { key: "thu", label: "T" },
    { key: "fri", label: "F" },
    { key: "sat", label: "S" },
    { key: "sun", label: "S" },
  ];

  const handleCreate = () => {
    const newTask = {
      id : Date.now(),
      title: formState.title,
      description: formState.description,
      priority: formState.priority,
      time: {
        start: formState.time.start,
        end: formState.time.end,
      },
      repeat: {
        type: formState.repeat.type,
        days: formState.repeat.days,
        date: formState.repeat.type === "once"
          ? formState.repeat.date
          : today,
      },
      completedDates: [],
      createdAt: new Date().toISOString().slice(0, 10),
    }

    setTasks([...tasks, newTask])

    setFormState({
    title: "",
    description: "",
    priority: "medium",
    time: { start: "", end: "" },
    repeat: { type: "once", days: [], date: "" },
  });

  console.log("Task Created:", newTask);
  console.log(tasksData);
  };


  return (
    <div className="flex-1 h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-auto">
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Create Task
          </h1>
          <p className="text-slate-600 text-lg">
            Create and schedule your tasks for maximum productivity
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
          <div className="mb-8">
            <label className="block text-slate-700 font-semibold mb-3 text-lg">
              Task Title
            </label>
            <input
              type="text"
              placeholder="e.g., Weekly Team Sync"
              className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent text-lg transition-all"
              value={formState.title}
              onChange={(e) =>
                setFormState({ ...formState, title: e.target.value })
              }
            />
          </div>

          <div className="mb-8">
            <label className="block text-slate-700 font-semibold mb-3 text-lg">
              Priority Level
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setFormState({ ...formState, priority: "low" })}
                className={`p-4 rounded-xl border flex items-center justify-center gap-2 font-medium transition-all cursor-pointer ${formState.priority === "low" ? "bg-[#c6ffcf] text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}
              >
                Low Priority
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormState({ ...formState, priority: "medium" })
                }
                className={`p-4 rounded-xl border flex items-center justify-center gap-2 font-medium transition-all cursor-pointer ${formState.priority === "medium" ? "bg-[#fff6a5] text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}
              >
                Medium Priority
              </button>

              <button
                type="button"
                onClick={() => setFormState({ ...formState, priority: "high" })}
                className={`p-4 rounded-xl border flex items-center justify-center gap-2 font-medium transition-all cursor-pointer ${formState.priority === "high" ? "bg-[#ffc6c6] text-slate-900" : "bg-white border-slate-200 text-slate-600"}`}
              >
                High Priority
              </button>

              
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-slate-700 font-semibold mb-3 text-lg">
                Time Schedule
              </label>

              <div className="flex gap-4">
                <div className="flex-1">
                  <span className="text-sm text-slate-500 mb-1 block">
                    Start Time
                  </span>
                  <input
                    type="time"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
                    value={formState.time.start}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        time: { ...formState.time, start: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="flex-1">
                  <span className="text-sm text-slate-500 mb-1 block">
                    End Time
                  </span>
                  <input
                    type="time"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
                    value={formState.time.end}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        time: { ...formState.time, end: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-3 text-lg">
                Repetition
              </label>

              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormState({
                      ...formState,
                      repeat: { ...formState.repeat, type: "once", days: [] },
                    })
                  }
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium cursor-pointer
                    ${formState.repeat.type === "once" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  Once
                </button>
                <button 
                  type="button"
                  onClick={() => setFormState({...formState, repeat: {...formState.repeat, type: "weekly"}})}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium cursor-pointer
                    ${formState.repeat.type === "weekly" ? "bg-slate-800 text-white" : "font-medium bg-slate-100 text-slate-600"}`}>
                  Weekly
                </button>
              </div>

              <div className="flex justify-center gap-1">
                <div className="flex justify-between gap-1">
                  {days.map((day) => {
                    const isActive = formState.repeat.days.includes(day.key);

                    return (
                      <button
                        key={day.key}
                        type="button"
                        disabled={formState.repeat.type !== "weekly"}
                        onClick={() => {
                          if (formState.repeat.type !== "weekly") return;

                          setFormState({
                            ...formState,
                            repeat: {
                              ...formState.repeat,
                              days: isActive
                                ? formState.repeat.days.filter(d => d !== day.key)
                                : [...formState.repeat.days, day.key],
                            },
                          });
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition cursor-pointer
                          ${
                            isActive
                              ? "bg-lime-400 text-slate-900 shadow-md"
                              : "bg-slate-100 text-slate-400"
                          }
                          ${formState.repeat.type !== "weekly" ? "opacity-40 cursor-not-allowed" : ""}
                        `}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
            <button className="px-8 py-3 rounded-xl font-bold bg-lime-400 hover:bg-lime-500 text-slate-900 shadow-lg shadow-lime-200 transition-all cursor-pointer"
            onClick={handleCreate}>
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTasks;
