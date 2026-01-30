import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Circle, CheckCircle2, Calendar } from "lucide-react";

// import tasksData from "../data/tasks.json";

const Tasks = () => {

  const [selectedDate, setSelectedDate] = useState(0);

  function getDateLabel() {
    if (selectedDate === -1) return "Yesterday";
    if (selectedDate === 1) return "Tomorrow";
    return "Today";
  }

  return (
    <div className="flex-1 h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-auto">
      <div className="p-8 max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            My Tasks
          </h1>
          <p className="text-slate-600 text-lg">
            Stay organized and track your daily progress
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <button
              disabled={selectedDate === -1}
              onClick={() => setSelectedDate(selectedDate - 1)}
              className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="text-center">
              <div className="flex items-center gap-3 justify-center mb-1">
                <Calendar size={22} />
                <h2 className="text-3xl font-bold">
                  {getDateLabel()}
                </h2>
              </div>
              <p className="text-sm text-slate-600">
              </p>
            </div>

            <button
              disabled={selectedDate === 1}
              onClick={() => setSelectedDate(selectedDate + 1)}
              className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-lime-100 p-6 rounded-3xl shadow">
            <p className="text-sm">Completed</p>
            <p className="text-4xl font-bold">10</p>
          </div>

          <div className="bg-indigo-100 p-6 rounded-3xl shadow">
            <p className="text-sm">Remaining</p>
            <p className="text-4xl font-bold">
              6
            </p>
          </div>

          <div className="bg-purple-100 p-6 rounded-3xl shadow">
            <p className="text-sm">Progress</p>
            <p className="text-4xl font-bold mb-3">
              8%
            </p>

            <div className="w-full bg-purple-200 rounded-full h-3">
              <div
                className="bg-purple-600 h-3 rounded-full"
                style={{ width: 8 + "%" }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Tasks