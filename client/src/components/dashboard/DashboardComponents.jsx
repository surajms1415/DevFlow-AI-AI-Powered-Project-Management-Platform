import { Card, CardBody } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

export const StatCard = ({ title, value, icon: Icon, trend }) => (
  <Card className="h-full">
    <CardBody className="flex items-center justify-between p-5">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
        {trend && (
          <p className={`text-xs mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value} from last week
          </p>
        )}
      </div>
      <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
        <Icon size={24} />
      </div>
    </CardBody>
  </Card>
);

export const ActivityItem = ({ title, time, userInitial }) => (
  <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
    <Avatar initials={userInitial} size="sm" />
    <div className="flex-1">
      <p className="text-sm text-slate-800 font-medium">{title}</p>
      <p className="text-xs text-slate-500 mt-0.5">{time}</p>
    </div>
  </div>
);

export const TaskItem = ({ title, project, status }) => {
  const statusColors = {
    'In Progress': 'primary',
    'To Do': 'default',
    'Review': 'warning',
    'Done': 'success'
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-slate-800">{title}</p>
        <p className="text-xs text-slate-500">{project}</p>
      </div>
      <Badge variant={statusColors[status] || 'default'}>{status}</Badge>
    </div>
  );
};
