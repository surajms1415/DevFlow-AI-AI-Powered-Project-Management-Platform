import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { ProductivityChart } from '../components/dashboard/ProductivityChart';
import { StatCard, ActivityItem, TaskItem } from '../components/dashboard/DashboardComponents';
import { LayoutDashboard, CheckSquare, Users } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderGreeting = () => {
    const hour = new Date().getHours();
    let greeting = 'Good evening';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';
    return `${greeting}, ${user?.name?.split(' ')[0] || 'User'}`;
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
        <Skeleton className="w-64 h-8 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-[380px]" />
            <Skeleton className="h-[300px]" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[280px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{renderGreeting()}</h2>
        <p className="text-slate-500 dark:text-slate-400">Here's what's happening with your projects today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Projects" value="12" icon={LayoutDashboard} trend={{ value: '2', isPositive: true }} />
        <StatCard title="Tasks Completed" value="64" icon={CheckSquare} trend={{ value: '12%', isPositive: true }} />
        <StatCard title="Team Members" value="8" icon={Users} trend={{ value: '1', isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Productivity Velocity</h3>
            </CardHeader>
            <CardBody>
              <ProductivityChart />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Recent Activity</h3>
            </CardHeader>
            <CardBody className="p-4">
              <ActivityItem title="Sarah pushed to main branch" time="2 hours ago" userInitial="S" />
              <ActivityItem title="You completed task 'Design System'" time="4 hours ago" userInitial="Y" />
              <ActivityItem title="Mike commented on PR #42" time="Yesterday" userInitial="M" />
              <ActivityItem title="Project Alpha deployed to production" time="Yesterday" userInitial="P" />
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Tasks Due Today</h3>
            </CardHeader>
            <CardBody className="p-4">
              <TaskItem title="API Integration" project="Project Alpha" status="In Progress" />
              <TaskItem title="Update Dependencies" project="DevFlow Core" status="To Do" />
              <TaskItem title="Fix Auth Bug" project="Project Alpha" status="Review" />
              <TaskItem title="Write Documentation" project="DevFlow Docs" status="To Do" />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">Upcoming Deadlines</h3>
            </CardHeader>
            <CardBody className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-slate-800">Phase 3 Release</p>
                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">Tomorrow</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-slate-800">Client Demo</p>
                  <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">In 3 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-slate-800">Q3 Planning</p>
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Next Week</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
