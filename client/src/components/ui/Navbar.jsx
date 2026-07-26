import { Bell, Search } from 'lucide-react';
import { Avatar } from './Avatar';
import { Input } from './Input';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between px-6 glass">
      <div className="flex items-center gap-4 flex-1">
        <h1 className="text-xl font-bold text-indigo-600 mr-8">DevFlow AI</h1>
        <div className="hidden md:block w-96">
          <Input icon={Search} placeholder="Search tasks, projects, or docs..." className="bg-slate-100/50 border-none" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
          <Bell size={20} />
        </button>
        <Avatar initials="JD" className="bg-indigo-100 text-indigo-600" />
      </div>
    </header>
  );
};
