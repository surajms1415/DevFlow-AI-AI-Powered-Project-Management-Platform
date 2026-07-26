import { useState } from 'react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User, Lock, Bell, Palette, LogOut, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Palette },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Settings saved successfully', 'success');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Profile Information</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Update your account's profile information and email address.</p>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <Input label="Full Name" defaultValue={user?.name || ''} />
              <Input label="Email Address" type="email" defaultValue={user?.email || ''} disabled />
              <Button type="submit" className="mt-4">Save Changes</Button>
            </form>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Update Password</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Ensure your account is using a long, random password to stay secure.</p>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="Confirm Password" type="password" />
              <Button type="submit" className="mt-4">Update Password</Button>
            </form>
            
            <div className="pt-6 border-t border-gray-200 dark:border-slate-700 mt-10">
              <h3 className="text-lg font-medium text-red-600 dark:text-red-500">Delete Account</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 mb-4">Permanently delete your account and all associated data.</p>
              <Button variant="danger" icon={<Trash2 size={16} />}>Delete Account</Button>
            </div>
          </div>
        );
      case 'preferences':
        return (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">Appearance & Preferences</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Customize how DevFlow AI looks and acts on your device.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                <div>
                  <p className="font-medium dark:text-slate-100">Theme</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Select your preferred theme</p>
                </div>
                <select 
                  className="border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 bg-white dark:bg-slate-800 dark:text-white border"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto h-[calc(100vh-64px)] overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon size={18} className={activeTab === tab.id ? 'text-indigo-700 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          <Card className="min-h-[500px] shadow-sm border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardBody className="p-8">
              {renderContent()}
            </CardBody>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Settings;
