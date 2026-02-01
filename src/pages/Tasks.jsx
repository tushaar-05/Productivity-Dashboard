import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Circle, CheckCircle2, Calendar, Flag } from "lucide-react";

// import tasksData from "../data/tasks.json";

const Tasks = () => {

  const [selectedDate, setSelectedDate] = useState(0);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + selectedDate);

  const activeDate = targetDate.toISOString().slice(0, 10);
  const activeDay = targetDate
    .toLocaleDateString("en-US", { weekday: "short" })
    .toLowerCase();

  function getDateLabel() {
    if (selectedDate === -1) return "Yesterday";
    if (selectedDate === 1) return "Tomorrow";
    return "Today";
  }

  const isTaskForToday = (task) => {
    if (task.repeat.type === "once") {
      if (!task.repeat.date) return false;
      return task.repeat.date === activeDate;
    }

    if (task.repeat.type === "weekly") {
      return task.repeat.days.includes(activeDay);
    }

    return false;
  };


  const visibleTasks = tasks.filter(isTaskForToday);
  const isToday = selectedDate === 0;

  console.log(visibleTasks);

  const isTaskCompleted = (task) => {
    return task.completedDates.includes(activeDate);
  };

  const toggleTaskCompletion = (taskId) => {
    if (!isToday) return;

    setTasks(prev =>
      prev.map(task => {
        if (task.id !== taskId) return task;

        const isDone = task.completedDates.includes(activeDate);

        return {
          ...task,
          completedDates: isDone
            ? task.completedDates.filter(d => d !== activeDate)
            : [...task.completedDates, activeDate],
        };
      })
    );
  };

  const formatTime = (time) => {
    if (typeof time === 'string') {
      return time;
    }
    if (time && time.start && time.end) {
      return `${time.start} - ${time.end}`;
    }
    return '';
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-red-100',
          text: 'text-red-700',
          border: 'border-red-300',
          icon: 'text-red-600'
        };
      case 'medium':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-700',
          border: 'border-orange-300',
          icon: 'text-orange-600'
        };
      case 'low':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          border: 'border-green-300',
          icon: 'text-green-600'
        };
      default:
        return {
          bg: 'bg-slate-100',
          text: 'text-slate-700',
          border: 'border-slate-300',
          icon: 'text-slate-600'
        };
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const completedCount = visibleTasks.filter(isTaskCompleted).length;
  const remainingCount = visibleTasks.length - completedCount;
  const progressPercent = visibleTasks.length > 0 
    ? Math.round((completedCount / visibleTasks.length) * 100) 
    : 0;

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
              className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="text-center">
              <div className="flex items-center gap-3 justify-center mb-1">
                <Calendar size={22} className="text-slate-600" />
                <h2 className="text-3xl font-bold">
                  {getDateLabel()}
                </h2>
              </div>
              <p className="text-sm text-slate-600">
                {targetDate.toLocaleDateString("en-US", { 
                  month: "long", 
                  day: "numeric", 
                  year: "numeric" 
                })}
              </p>
            </div>

            <button
              disabled={selectedDate === 1}
              onClick={() => setSelectedDate(selectedDate + 1)}
              className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-lime-100 p-6 rounded-3xl shadow">
            <p className="text-sm text-lime-800 font-medium mb-1">Completed</p>
            <p className="text-4xl font-bold text-lime-900">{completedCount}</p>
          </div>

          <div className="bg-indigo-100 p-6 rounded-3xl shadow">
            <p className="text-sm text-indigo-800 font-medium mb-1">Remaining</p>
            <p className="text-4xl font-bold text-indigo-900">
              {remainingCount}
            </p>
          </div>

          <div className="bg-purple-100 p-6 rounded-3xl shadow">
            <p className="text-sm text-purple-800 font-medium mb-1">Progress</p>
            <p className="text-4xl font-bold text-purple-900 mb-3">
              {progressPercent}%
            </p>

            <div className="w-full bg-purple-200 rounded-full h-3">
              <div
                className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: progressPercent + "%" }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            {visibleTasks.length === 0 ? "No tasks scheduled" : `Tasks for ${getDateLabel()}`}
          </h3>
          
          {visibleTasks.length === 0 ? (
            <div className="text-center py-12">
              <Circle size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 text-lg">No tasks scheduled for this day</p>
              <p className="text-slate-400 text-sm mt-2">Add tasks to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {visibleTasks.map((task) => {
                const completed = isTaskCompleted(task);
                const priorityStyles = getPriorityStyles(task.priority);
                
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`
                      flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200
                      ${completed 
                        ? 'bg-lime-50 border-lime-300' 
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }
                      ${isToday ? 'cursor-pointer' : 'cursor-default opacity-75'}
                    `}
                  >
                    <div className="flex-shrink-0">
                      {completed ? (
                        <CheckCircle2 
                          size={28} 
                          className="text-lime-600" 
                          strokeWidth={2.5}
                        />
                      ) : (
                        <Circle 
                          size={28} 
                          className="text-slate-400" 
                          strokeWidth={2}
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className={`
                        text-lg font-semibold transition-all
                        ${completed 
                          ? 'text-lime-900 line-through' 
                          : 'text-slate-800'
                        }
                      `}>
                        {task.title}
                      </h4>
                      
                      {task.description && (
                        <p className={`
                          text-sm mt-1
                          ${completed ? 'text-lime-700' : 'text-slate-600'}
                        `}>
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        {task.time && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Clock size={14} />
                            <span>{formatTime(task.time)}</span>
                          </div>
                        )}
                        
                        {task.priority && (
                          <span className={`
                            flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                            ${priorityStyles.bg} ${priorityStyles.text}
                          `}>
                            <Flag size={12} className={priorityStyles.icon} />
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                          </span>
                        )}
                        
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-medium
                          ${task.repeat.type === 'once' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                          }
                        `}>
                          {task.repeat.type === 'once' ? 'One-time' : 'Weekly'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Tasks