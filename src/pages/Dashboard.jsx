import { useState } from 'react';
import { CheckCircle2, Clock, AlertCircle, ClockAlert } from 'lucide-react';

const Dashboard = () => {
  const [totalTasks, setTotalTasks] = useState(50);
  const [inProgressTasks, setInProgressTasks] = useState(10);
  const [pendingTasks, setPendingTasks] = useState(5);
  const [completedTasks, setCompletedTasks] = useState(3);
  const [overdueTasks, setOverdueTasks] = useState(2);

  const getPercentage = (value, total) =>
    total === 0 ? 0 : Math.round((value / total) * 100);

  const stats = [
    {
      id: 1,
      title: "Tasks Completed",
      value: completedTasks,
      icon: CheckCircle2,
      bgGradient: "from-lime-50 to-lime-100",
      iconBg: "bg-lime-200",
      textColor: "text-lime-700",
      barColor: "bg-lime-500",
      progressPercentage: getPercentage(completedTasks, totalTasks),
      border: "border-t border-lime-300",
    },
    {
      id: 2,
      title: "In Progress",
      value: inProgressTasks,
      icon: Clock,
      bgGradient: "from-amber-50 to-amber-100",
      iconBg: "bg-amber-200",
      textColor: "text-amber-700",
      barColor: "bg-amber-500",
      progressPercentage: getPercentage(inProgressTasks, totalTasks),
      border: "border-t border-amber-300",
    },
    {
      id: 3,
      title: "Pending Review",
      value: pendingTasks,
      icon: AlertCircle,
      bgGradient: "from-indigo-50 to-indigo-100",
      iconBg: "bg-indigo-200",
      textColor: "text-indigo-700",
      barColor: "bg-indigo-500",
      progressPercentage: getPercentage(pendingTasks, totalTasks),
      border: "border-t border-indigo-300",
    },
    {
      id: 4,
      title: "Overdue Tasks",
      value: overdueTasks,
      icon: ClockAlert,
      bgGradient: "from-rose-50 to-rose-100",
      iconBg: "bg-rose-200",
      textColor: "text-rose-700",
      barColor: "bg-rose-500",
      progressPercentage: getPercentage(overdueTasks, totalTasks),
      border: "border-t border-rose-300",
    },
  ];

  return (
    <div className="flex-1 h-screen bg-white overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Dashboard
          </h1>
          <p className="text-slate-600 text-lg">
            Welcome back! Here's your task overview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.id}
                className={`bg-linear-to-br ${stat.bgGradient} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.iconBg} p-3 rounded-2xl`}>
                    <Icon
                      className={stat.textColor}
                      size={28}
                      strokeWidth={2.5}
                    />
                  </div>
                </div>

                <h3 className="text-slate-600 text-sm font-medium mb-2">
                  {stat.title}
                </h3>

                <p className={`text-5xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>

                <div className={`mt-4 pt-4 ${stat.border}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-600">
                      Progress
                    </span>
                    <span className="text-sm font-bold text-slate-700">
                      {stat.value}/{totalTasks}
                    </span>
                  </div>

                  <div className="relative w-full h-2 rounded-full overflow-hidden bg-slate-200">
                    <div
                      className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out ${stat.barColor}`}
                      style={{ width: `${stat.progressPercentage}%` }}
                    >
                      <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-1">
                    {stat.progressPercentage}% complete
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;