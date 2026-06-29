import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStats, getApplications } from '../api/applications';
import type { Stats, Application } from '../types/index';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const STATUS_COLORS: Record<string, string> = {
  Applied: '#3B82F6',
  Interview: '#EAB308',
  Offer: '#22C55E',
  Rejected: '#EF4444',
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, appsData] = await Promise.all([
          getStats(),
          getApplications(),
        ]);
        setStats(statsData);
        setRecent(appsData.slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!stats) return null;

  const activeCount = stats.byStatus.find(s => s.status === 'Interview')?.count ?? 0;
  const offerCount = stats.byStatus.find(s => s.status === 'Offer')?.count ?? 0;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Applications" value={stats.total} color="blue" />
        <StatCard label="In Interview" value={activeCount} color="yellow" />
        <StatCard label="Offers" value={offerCount} color="green" />
        <StatCard label="Response Rate" value={`${stats.responseRate}%`} color="purple" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Pie chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={stats.byStatus}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name} (${value})`}
              >
                {stats.byStatus.map(entry => (
                  <Cell
                    key={entry.status}
                    fill={STATUS_COLORS[entry.status] ?? '#9CA3AF'}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Applications by Status</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats.byStatus} margin={{ top: 4, right: 16, left: -16, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="status" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {stats.byStatus.map(entry => (
                  <Cell
                    key={entry.status}
                    fill={STATUS_COLORS[entry.status] ?? '#9CA3AF'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent applications */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Recent Applications</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left pb-2 font-medium text-gray-500">Company</th>
              <th className="text-left pb-2 font-medium text-gray-500">Role</th>
              <th className="text-left pb-2 font-medium text-gray-500">Status</th>
              <th className="text-left pb-2 font-medium text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recent.map(app => (
              <tr
                key={app.id}
                onClick={() => navigate(`/applications/${app.id}`)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="py-2.5 font-medium text-gray-800">{app.company}</td>
                <td className="py-2.5 text-gray-500">{app.role}</td>
                <td className="py-2.5">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${STATUS_COLORS[app.status]}20`,
                      color: STATUS_COLORS[app.status],
                    }}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="py-2.5 text-gray-400">
                  {new Date(app.appliedDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: 'blue' | 'yellow' | 'green' | 'purple';
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    green: 'bg-green-50 text-green-700 border-green-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
  };

  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <p className="text-xs font-medium opacity-70 mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}