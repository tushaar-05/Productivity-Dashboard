import { Home, CheckSquare, BarChart3, Settings, LogOut, SquarePen } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => {

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'Tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'create-task', label: 'Create Task', icon: SquarePen },
    { id: 'manage-task', label: 'Manage Tasks', icon: SquarePen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-[280px] h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-6 flex flex-col">
      <div className="mb-8 ml-[20px] flex items-center gap-3">
        <div className="grid grid-cols-2 gap-1">
          <div className="w-2.5 h-2.5 bg-slate-700 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-slate-700 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-slate-700 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-slate-700 rounded-full"></div>
        </div>
        <h1 className="text-2xl font-semibold text-slate-800">Smart-Task</h1>
      </div>

      <nav className="flex flex-col gap-3 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`
                flex items-center gap-4 px-6 py-4 rounded-2xl
                transition-all duration-200 ease-in-out cursor-pointer
                ${isActive
                  ? 'bg-lime-200 text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/50'
                }
              `}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-lg ${isActive ? 'font-medium' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <button
        className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 ease-in-out mt-4"
      >
        <LogOut size={22} strokeWidth={2} />
        <span className="text-lg font-normal cursor-pointer">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;