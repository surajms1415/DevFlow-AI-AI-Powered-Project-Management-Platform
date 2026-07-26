import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, CheckSquare, Users, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Sidebar = () => {
  const links = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Kanban Board', path: '/kanban', icon: CheckSquare },
    { name: 'Analytics', path: '/analytics', icon: LayoutDashboard },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hidden md:flex flex-col h-full">
      <nav className="flex-1 px-4 py-6 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
              )
            }
          >
            <link.icon size={18} />
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
