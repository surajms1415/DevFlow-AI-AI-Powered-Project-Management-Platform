import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ProductivityChart } from '../components/dashboard/ProductivityChart';

ChartJS.register(ArcElement, Tooltip, Legend);

const Analytics = () => {
  const teamPerformanceData = {
    labels: ['John Doe', 'Sarah Smith', 'Mike Johnson'],
    datasets: [
      {
        data: [12, 19, 8],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const statusDistributionData = {
    labels: ['Completed', 'In Progress', 'Review', 'Todo'],
    datasets: [
      {
        data: [64, 12, 8, 22],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(148, 163, 184, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="p-6 h-[calc(100vh-64px)] overflow-y-auto max-w-[1600px] mx-auto space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Project Analytics</h2>
        <p className="text-slate-500 text-sm mt-1">Deep dive into your team's performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-lg text-slate-800">Team Performance</h3>
          </CardHeader>
          <CardBody className="flex justify-center items-center h-[300px]">
            <Doughnut data={teamPerformanceData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold text-lg text-slate-800">Task Status Distribution</h3>
          </CardHeader>
          <CardBody className="flex justify-center items-center h-[300px]">
            <Doughnut data={statusDistributionData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-lg text-slate-800">Weekly Velocity (Burn Down)</h3>
        </CardHeader>
        <CardBody>
          <ProductivityChart />
        </CardBody>
      </Card>
    </div>
  );
};

export default Analytics;
